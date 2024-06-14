"use client";
import { observer } from "mobx-react";
import MobxStore from "@/mobx";

import { PodcastEmptyPlaceholder } from "@/reusable-ui/EmptyList";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/reusable-ui/ComboBox";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PathwayPlayer } from "@/app/dashboard/page";
import { PathwayCard, TitleDescription } from "@/app/today/pathwaycomponents";
import { DeleteDialog } from "@/components/Dialogs/DeleteDialog";
import { useToast } from "@/components/ui/use-toast";

const CustomListPage = observer(({ params }) => {
  const {
    userPathways,
    pathwayPlaying,
    findPathwaysByListId,
    addPathwayToList,
    lists,
    deleteList,
    editListName,
  } = MobxStore;
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditListDialog, setShowEditListDialog] = useState(false);

  const { toast } = useToast();

  const listId = params.id;
  const list = lists.filter((list) => list.id === listId)[0];
  const listPathways = findPathwaysByListId(listId);

  const [listName, setListName] = useState(list?.name || "New List");

  const onListNameChange = (e) => {
    setListName(e.target.value);
  };

  const userPathwaysInCombobox = userPathways
    .filter((p) => !listPathways.some((lp) => lp.id === p.id))
    .map((pathway) => ({
      id: pathway.id,
      label: `${pathway.emoji} ${pathway.name}`,
      value: pathway.name,
    }));

  const [selectedPathway, setSelectedPathway] = useState(
    userPathwaysInCombobox[0]
  );

  if (pathwayPlaying) {
    return <PathwayPlayer pathway={pathwayPlaying} />;
  }

  const router = useRouter();

  const AddPathway = ({ trigger }) => {
    return (
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Routine</DialogTitle>
            <DialogDescription>
              Select a pathway to add to this list
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Combobox
                value={
                  selectedPathway?.value || userPathwaysInCombobox[0]?.value
                }
                setValue={(value) => {
                  setSelectedPathway(
                    userPathwaysInCombobox.find(
                      (p) => p.value.toLowerCase() === value.toLowerCase()
                    )
                  );
                }}
                searchLabel="Pathway"
                options={userPathwaysInCombobox}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                addPathwayToList(listId, selectedPathway.id);
                setShowDialog(false);
                toast({ title: "✔️ Routine Added" });
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="h-full m-2 sm:mx-8">
      <TitleDescription
        title={list?.name}
        button={
          <div className="flex items-end">
            <Dialog
              open={showEditListDialog}
              onOpenChange={setShowEditListDialog}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="p-2 mr-2">
                    <HiOutlineCog6Tooth className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DialogTrigger className="w-full flex">
                      Edit List
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DeleteDialog
                    trigger={
                      <div className="w-[120px] hover:bg-accent cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        Delete List
                      </div>
                    }
                    onDelete={() => {
                      deleteList(listId);
                      router.push("/dashboard");
                    }}
                    setShow={setShowDeleteDialog}
                    show={showDeleteDialog}
                    label="list"
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit List Name</DialogTitle>
                  <DialogDescription>
                    Choose a name for your list.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      onChange={onListNameChange}
                      defaultValue={list?.name}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={listName === list?.name}
                    onClick={() => {
                      editListName(listId, listName);
                      setShowEditListDialog(false);
                      toast({ title: "✔️ List Name Changed" });
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button onClick={() => setShowDialog(true)}>
              <Plus size={16} className="mr-2" />
              Add Routine
            </Button>
          </div>
        }
      />
      {!listPathways.length && (
        <PodcastEmptyPlaceholder
          title="Your List is Empty"
          description="Add your first routine to this list"
        >
          <AddPathway
            trigger={
              <Button onClick={() => setShowDialog(true)}>
                <Plus size={16} className="mr-2" />
                Add Routine
              </Button>
            }
          />
        </PodcastEmptyPlaceholder>
      )}
      <div className="flex flex-wrap gap-4">
        {listPathways.map((pathway, i) => (
          <PathwayCard key={i} pathway={pathway} listId={listId} />
        ))}
        {listPathways.length > 0 && (
          <AddPathway
            trigger={
              <div className="cursor-pointer hover:bg-muted rounded-lg border bg-card text-card-foreground shadow-sm p-4 w-64 h-[350px] flex-col justify-center items-center relative text-gray-400 hidden sm:flex">
                <div className="flex items-center gap-1">
                  <span className="text-2xl">+</span>Add
                </div>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
});

export default CustomListPage;

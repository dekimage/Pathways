import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Trash2 } from "lucide-react";
export const DeleteDialog = ({ trigger, onDelete, setShow, show, label }) => {
  const { toast } = useToast();
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger>
        {trigger ? (
          <div className="w-[120px]">{trigger}</div>
        ) : (
          <Button className="ml-2" variant="outline">
            Delete <Trash2 size={14} className="ml-1" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will delete your {label}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setShow(false);
              onDelete();
              toast({ title: `${label} deleted` });
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

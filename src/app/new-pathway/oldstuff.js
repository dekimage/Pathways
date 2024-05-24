// const ImageSelection = ({ selectedImage, setSelectedImage }) => {
//   return (
//     <div className="max-h-[300px] overflow-y-auto mt-4">
//       {STATIC_IMAGES.map((image, index) => (
//         <div
//           key={index}
//           className={`p-1 my-2 cursor-pointer h-24 bg-cover  bg-no-repeat bg-center w-full border-4  ${
//             selectedImage === index ? "border-black" : "border-slate-200"
//           }`}
//           onClick={() => setSelectedImage(index)}
//         >
//           <div
//             className="h-20 bg-cover  bg-no-repeat bg-center w-full"
//             style={{ backgroundImage: `url(${image})` }}
//           ></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const DialogSelectBackground = ({ handleSelectImage, background }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div
//           className="h-24 bg-cover  bg-no-repeat bg-center w-full flex justify-center items-center  cursor-pointer border border-gray border-dashed mt-4"
//           style={{ backgroundImage: `url(${background})` }}
//         >
//           {!background && (
//             <div>
//               <span className="text-2xl mr-1">+</span> Add Image Background
//             </div>
//           )}
//         </div>
//       </DialogTrigger>

//       <DialogContent>
//         <DialogTitle>Select Background</DialogTitle>
//         <ImageSelection
//           selectedImage={selectedImage}
//           setSelectedImage={setSelectedImage}
//         />
//         <DialogClose asChild>
//           <Button
//             onClick={() => handleSelectImage(STATIC_IMAGES[selectedImage])}
//           >
//             Apply
//           </Button>
//         </DialogClose>
//       </DialogContent>
//     </Dialog>
//   );
// };

{
  /* <DialogSelectBackground
          background={pathway.background}
          handleSelectImage={(value) => handleInputChange("background", value)}
        /> */
}

// u bilderot za tie types

{
  /* <ComboBoxWithHelper
          title="When"
          value={pathway.timeType || "any"}
          setValue={(value) => {
            handleInputChange("timeType", value);
          }}
          searchLabel={"Trigger"}
          options={[
            {
              value: "any",
              label: "Anytime",
            },
            {
              value: "time",
              label: "Time/Day Specific",
            },
            {
              value: "event",
              label: "Event Triggered",
            },
          ]}
          helperChildren={"When will you do this routine?"}
        /> */
}

{
  /* <div className="mt-4 text-md font-medium">Time</div>
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={pathway.time}
              onChange={(e) => handleInputChange("time", e.target.value)}
              className="mb-4 p-2 border  rounded"
            /> */
}

// muzika i svasta
{
  /* <SwitchWithHelper
          title="Background Music"
          value={openMusic}
          callback={() => setOpenMusic(!openMusic)}
          helperChildren={"Auto play is..."}
        /> */
}
{
  /* {openMusic && (
          <div className="flex flex-col pl-4 border-l">
            <SwitchWithHelper
              title="Auto Play Music"
              value={pathway.autoPlayMusic}
              callback={() =>
                handleInputChange("autoPlayMusic", !pathway.autoPlayMusic)
              }
              helperChildren={"Auto play is..."}
            />

            <div className="flex justify-between mt-4">
              <Combobox
                value={musicTrack}
                setValue={setMusicTrack}
                searchLabel={"Music Track"}
                options={STATIC_MUSIC_TRACKS}
                select
              />

              <Button>Try it</Button>
            </div>
          </div>
        )} */
}

// export const EmojiBox = ({ emoji, setEmojiPickerOpen = false }) => {
//   return (
//     <div
//       className={`flex justify-center items-center border border-slate w-fit p-4 text-4xl ${
//         setEmojiPickerOpen && "cursor-pointer"
//       }`}
//       onClick={() => {
//         setEmojiPickerOpen && setEmojiPickerOpen(true);
//       }}
//     >
//       {emoji}
//     </div>
//   );
// };

// step ->
{
  /* {step.responseType == "text" && (
            <div className="flex flex-col pl-4 border-l">
              <SwitchWithHelper
                title="Set Minimum Text"
                value={step.minText}
                callback={() =>
                  handleUpdateStepChange(
                    index,
                    "minText",
                    step.minText ? 0 : 30
                  )
                }
                helperChildren={"hey"}
              />
              {!!step.minText && (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    name="minText"
                    placeholder={`Minimum Text`}
                    value={step.minText}
                    onChange={(e) => handleStepChange(index, e)}
                    className="p-2 border  rounded w-[70px]"
                  />
                  <div>Words</div>
                </div>
              )}
            </div>
          )} */
}

{
  /* {step.responseType === "mood" && <div>Mood Selector</div>} */
}

{
  /* <div className="border-t border-gray-200 mt-4"></div> */
}

{
  /* <SwitchWithHelper
            title="Allow Skip Step"
            value={step.allowSkip}
            callback={() =>
              handleUpdateStepChange(index, "allowSkip", !step.allowSkip)
            }
            helperChildren={"hey"}
          /> */
}

// VO FUNCKIJATA STO E HANDLE SUBMIT ZA CREATE PATHWAY - OVA BESE ZA TEMPLATE SHARING
// if (
//   pathwayToEdit.creatorId === MobxStore.user.uid &&
//   !pathwayToEdit.isCopy
// ) {
//   // Edit my own template
//   await MobxStore.updatePathway(pathwayToEdit.id, pathway);
//   setIsPathwayEditView(false);
//   return;
// }
// // Make a copy from someone else's template

// // AKO MI TREBA SAMO CREATE - VAKA, ALI AKO TREBA I DA PROVERAM DALI VEKJE GO IMA ONDAK SO GETOR CREATE,
// // MOZAM SO UI DA SREDAM OVOJ CASE ZA NA SETTINGS KOPCETO DA TE PRASA DALI SAKAS DA IDES NA TVOJOT EXISTING COPY ILI NOV SAKAS OD TOJ TEMPLATE
// // const copyId = await MobxStore.getOrCreateUserPathwayCopy(
// //   pathwayToEdit.id
// // );

// const copyId = await MobxStore.createPathwayCopy(pathwayToEdit.id);

// // update the fresh copy just made
// if (copyId) {
//   const pathwayWithoutId = { ...pathway };
//   delete pathwayWithoutId.id;
//   await MobxStore.updateUserPathway(copyId, pathwayWithoutId);
// }

// setIsPathwayEditView(false);

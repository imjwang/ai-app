// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// // import Chat from "@/components/chat";
// import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

// export default function ChatModal() {
//   let isMobile = false;
//   if (typeof window !== "undefined") {
//     isMobile = window?.innerWidth < 640;
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         {isMobile ? (
//           <div className="relative">
//             <MagnifyingGlassIcon className="w-7 h-7 absolute bottom-1 right-1" />
//           </div>
//         ) : (
//           <div className="flex space-x-10 items-center mx-2 h-8 border bg-background border-black dark:border-stone-500 w-40 rounded-md pl-2 cursor-pointer text-sm select-none">
//             <p className="text-stone-700 dark:text-stone-400">Search...</p>
//             <p className="text-stone-400 dark:text-stone-700">⌘ K</p>
//           </div>
//         )}
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Chat Dialog</DialogTitle>
//           <DialogDescription>ask anything</DialogDescription>
//         </DialogHeader>
//         {/* <Chat className="p-5" /> */}
//         {/* <div className="grid gap-4 py-4">
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="name" className="text-right">
//           Name
//         </Label>
//         <Input id="name" value="Pedro Duarte" className="col-span-3" />
//       </div>
//       <div className="grid grid-cols-4 items-center gap-4">
//         <Label htmlFor="username" className="text-right">
//           Username
//         </Label>
//         <Input id="username" value="@peduarte" className="col-span-3" />
//       </div>
//     </div> */}
//         <DialogFooter>
//           {/* <Button type="submit">Save changes</Button> */}
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

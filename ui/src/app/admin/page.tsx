import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Collection } from "chromadb";

export default async function Page() {
  const chromaCollections = await fetch("http://127.0.0.1:8000/chroma");

  const localChromaCollections = await chromaCollections.json();

  return (
    <div className="flex flex-col gap-4 p-24">
      <div className="prose">
        <h1 className="dark:text-white">Admin</h1>
        <h3 className="dark:text-white">Chroma Collections</h3>
      </div>
      <Table>
        <TableCaption>A list of your local chroma collections.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Metadata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localChromaCollections.map((collection: Collection) => (
            <TableRow key={collection.id}>
              <TableCell className="font-medium">{collection.name}</TableCell>
              <TableCell>{collection.id}</TableCell>
              {/* TODO Metadata is not just a string */}
              {/* <TableCell>{collection.metadata}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

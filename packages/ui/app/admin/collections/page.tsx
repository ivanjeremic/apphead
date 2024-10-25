"use client";
import { BackButton, Navigator } from "../../layouts/Navigator";
import { Input } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

export default function Collections() {
  return (
    <div className="max-w-full">
      <Navigator />
      {/* <div className="h-16 bg-white border-b border-gray-200 flex">
        {"asdsad" !== "Dashboard" && <BackButton />}
        <div className="sm:flex sm:items-center sm:justify-between p-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Foo</h3>
        </div>
      </div>
      <div className="relative flex-shrink-0 bg-white border-b border-gray-200 shadow-sm flex p-2">
        <Field  helperText={""}>
          <Input placeholder="Search Collections" />
        </Field>
      </div> */}
    </div>
  );
}

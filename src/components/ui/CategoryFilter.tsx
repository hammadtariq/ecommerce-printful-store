import { useState } from "react";
import {
  SfAccordionItem,
  SfListItem,
  SfIconChevronLeft,
  SfIconCheck,
} from "@storefront-ui/react";
import classNames from "classnames";

interface CategoryFilterProps {
  categories: string[];
  slug?: string;
}

export default function CategoryFilter({ categories, slug }: CategoryFilterProps) {
  const [opened, setOpened] = useState(true);

  const isSelected = (category: string) => {
    return (slug && slug.includes(category.replace(" ", "%20"))) || (category === "all" && !slug);
  };

  return (
    <SfAccordionItem
      open={opened}
      onToggle={() => setOpened(!opened)}
      className="w-full"
      summary={
        <div className="flex justify-between p-2 mb-2 bg-neutral-100 md:rounded-md px-4 py-2 text-sm font-bold uppercase">
          <p className="font-medium">Category</p>
          <SfIconChevronLeft
            className={classNames("text-neutral-500", { "rotate-90": opened, "-rotate-90": !opened })}
          />
        </div>
      }
    >
      <ul className="mt-2 mb-6">
        {categories.map((category) => (
          <li key={category}>
            <SfListItem
              size="sm"
              as="a"
              href={category === "all" ? "/category" : `/category/${category}`}
              className={classNames("first-of-type:mt-2 rounded-md active:bg-primary-100", {
                "bg-primary-100 hover:bg-primary-100 font-medium": isSelected(category),
              })}
              slotSuffix={isSelected(category) && <SfIconCheck size="sm" className="text-primary-700" />}
            >
              <span className="flex items-center">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </SfListItem>
          </li>
        ))}
      </ul>
    </SfAccordionItem>
  );
}

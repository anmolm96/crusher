import React, { JSXElementConstructor, useState } from "react";
import { Pagination } from "@ui/components/common/Pagination";

interface iFilter {
	title: string;
	value: number;
}

interface iFilterListPaginationProps {
	categories: iFilter[];
	items: any;
	currentPage: number;
	resolveCategoryUrl: any;
	totalPages: number;
	itemsPerPage: number;
	selectedCategory: number;
	itemsListComponent: JSXElementConstructor<any>;
	resolvePaginationUrl: any;
}

interface iFilters {
	category: number;
	currentPage: number;
}

const BuildList = (props: iFilterListPaginationProps) => {
	const { currentPage, items, resolvePaginationUrl, totalPages, selectedCategory, itemsListComponent: ItemsListComponent } = props;

	const [filters] = useState({
		currentPage: parseInt(currentPage as any),
		category: selectedCategory,
	} as iFilters);

	return (
		<div>
			<ItemsListComponent items={items} />

			<Pagination
				style={{ marginTop: "2.75rem" }}
				totalPages={totalPages || 1}
				currentPage={filters.currentPage}
				resolvePaginationUrl={resolvePaginationUrl}
			/>
		</div>
	);
};

export { BuildList };

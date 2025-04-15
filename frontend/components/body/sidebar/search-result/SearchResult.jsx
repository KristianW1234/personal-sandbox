import UserList from "./UserList.jsx";
import Pagination from "./Pagination.jsx";
import LoadingIcon from "../../../misc/LoadingIcon.jsx";

export default function SearchResult({
  searchLoading,
  currentUsers,
  handleSelect,
  totalPages,
  currentPage,
  handlePageChange,
  selected,
}) {
  const pages = [...Array(totalPages)].map((_, i) => i + 1);

  return (
    <div className="search-result-section">
      <div className="section-title">Search Results</div>
      {searchLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <UserList
            data={currentUsers}
            onSelect={handleSelect}
            selected={selected}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

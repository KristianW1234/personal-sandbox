import { useState, useEffect } from "react";
import { fetchData, fetchOptions } from "../../utils/api";

import LoadingIcon from "../misc/LoadingIcon.jsx";
import MainContent from "./content/MainContent.jsx";
import FormFilter from "./sidebar/search/FormFilter.jsx";
import SearchResult from "./sidebar/search-result/SearchResult.jsx";

export default function MainContainer() {
  //Loading constants
  const [searchLoading, setSearchLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [optionLoading, setOptionLoading] = useState(true);

  //Form constants
  const [regions, setRegions] = useState([]);
  const [roles, setRoles] = useState([]);
  const [clients, setClients] = useState({});
  const [industries, setIndustries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    region: "",
    activeClient: "",
    pastClient: "",
    industry: "",
    minValue: "",
    maxValue: "",
  });

  //User constants
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("default");
  const [activeUser, setActiveUser] = useState({});

  //Pagination constants
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  //Handling page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Handling clicking a user button to open content
  const handleSelect = (id) => {
    setSelected(id);
    setContentLoading(true);
    fetchData(
      "http://localhost:8000/api/sales-rep/" + id,
      "GET",
      null,
      (data) => {
        setActiveUser(data);
        setContentLoading(false);
      }
    );
  };

  //Handling changing search form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Handling search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSelected("default");
    setSearchLoading(true);
    // Remove keys with empty values
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== "")
    );

    // Check if the filtered object is empty, in which reload all data
    if (Object.keys(filteredData).length === 0) {
      fetchInitial();
      return;
    }

    fetchData(
      "http://localhost:8000/api/sales-reps/",
      "POST",
      filteredData,
      (data) => {
        setUsers(data.salesReps || []);
        setSearchLoading(false);
      }
    );
  };

  const fetchInitial = () => {
    fetchData("http://localhost:8000/api/sales-reps", "GET", null, (data) => {
      setUsers(data.salesReps || []);
      setSearchLoading(false);
    });
  };

  useEffect(() => {
    console.log(formData);
    fetchInitial();
    fetchOptions("http://localhost:8000/api/get-roles", setRoles, "roles");
    fetchOptions(
      "http://localhost:8000/api/get-regions",
      setRegions,
      "regions"
    );
    fetchOptions(
      "http://localhost:8000/api/get-clients",
      setClients,
      "clients"
    );
    fetchOptions(
      "http://localhost:8000/api/get-industries",
      setIndustries,
      "industries"
    );
    setOptionLoading(false);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [users]);

  return (
    <section className="main-container">
      <aside className="sidebar">
        <div className="search-section">
          <div className="section-title">Search Options</div>
          <FormFilter
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            optionLoading={optionLoading}
            roles={roles}
            regions={regions}
            clients={clients}
            industries={industries}
          />
        </div>
        <SearchResult
          searchLoading={searchLoading}
          currentUsers={currentUsers}
          handleSelect={handleSelect}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          selected={selected}
        />
      </aside>
      <div className="content">
        <MainContent
          selected={selected}
          contentLoading={contentLoading}
          user={activeUser}
        />
      </div>
    </section>
  );
}

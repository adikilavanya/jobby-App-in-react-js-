import {BsSearch} from 'react-icons/bs'

import ProfileCard from '../ProfileCard'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />

        <button
          type="button"
          id="searchButton"
          className="search-button-container"
          onClick={getJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const onSelectEmployeeType = event => {
    const {changeEmployeeList} = props

    changeEmployeeList(event.target.value)
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div className="employment-type-container">
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employee-type-list-container">
          {employmentTypesList.map(each => (
            <li
              className="employee-item"
              key={each.employmentTypeId}
              onChange={onSelectEmployeeType}
            >
              <input
                type="checkbox"
                id={each.employmentTypeId}
                className="check-input"
                value={each.employmentTypeId}
              />
              <label htmlFor={each.employmentTypeId} className="check-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const onClickSalary = event => {
    const {changeSalary} = props
    changeSalary(event.target.value)
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list-container">
          {salaryRangesList.map(each => (
            <li
              className="salary-item"
              key={each.salaryRangeId}
              onChange={onClickSalary}
            >
              <input
                type="radio"
                id={each.salaryRangeId}
                className="check-input"
                name="salary"
                value={each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId} className="check-label">
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileCard />
      <hr className="horizontal-line" />
      {renderTypeOfEmployment()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup

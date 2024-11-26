import React,{useState,useEffect, useRef} from 'react'


import {Link} from "react-router-dom"
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../../buildinglist.css';
import apiBaseUrl from '../../apiConfig';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputNumber } from 'primereact/inputnumber';

import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog'; // Import Dialog

import { OverlayPanel } from 'primereact/overlaypanel';
import indicatorsData from '../../data/indicators.json'; // Adjust the path based on file location
import { Tooltip } from "primereact/tooltip";

const IndicatorsList = () => {
    const [indicators, setIndicators] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredIndicators, setFilteredIndicators] = useState([]);

    const [q4all_Ind_number, setQ4AllIndNumber] = useState([]);
    const [category_of_Indicator, set_Category_Of_Indicator] = useState([])
    const [type_of_healthcare, setType_Of_HealthCare] = useState([])
    


    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState([]);

    const [statuses, setStatuses] = useState([
        { label: 'Proposed', value: 'Proposed' },
        { label: 'Draft', value: 'Draft' },
        { label: 'Formally approved', value: 'Formally approved' },
        { label: 'Piloting', value: 'Piloting' },
        { label: 'Deployed', value: 'Deployed' },


    ]); // Example list of options for dropdown


    const {user} = useSelector((state)=>state.auth)
    console.log(user)

    const [selectedDomain, setSelectedDomain] = useState(null);

    const domains = [
        { label: 'Secundary Healthcare',value:'Secundary Healthcare' },
        { label: 'Home/telecare and Active life', value: 'Home/telecare and Active life' },
        { label: 'Primary Care', value: 'Primary Care' },
        { label: 'Public health indicators', value:'Public health indicators' },
        { label: 'NCDs and Mental Health',value:'NCDs and Mental Health' },
        { label: 'Palliative and Long term care', value: 'Palliative and Long term care' },
        { label: 'All domains', value: 'All domains' },
    ];


    const [dimensions, setDimension] = useState([
        { label: 'safety', value: 'safety' },
        { label: 'effectiveness', value: 'effectiveness' }


    ]); // Example list of options for dropdown



    const dt = useRef(null);


        

    const formatCurrencyReport = (value) => {
        return Number(value);
    };


    const customHeader = (title, hint, field) => (
      <div>
        <div>{title}</div>
        <small
          id={`hint-${field}`}
          style={{
            display: "block",
            color: "#888",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width:"250px"
          }}
        >
          {hint}
        </small>
        <Tooltip target={`#hint-${field}`} content={hint} />
      </div>
    );


    useEffect(()=>{
        // getIndicators()

        if (user!=null && user.role=="user"){
            getIndicatorsByUser()
        }else if(user!=null && user.role=="admin"){
            getIndicators()
        }
       
        setLoading(false);
        initFilters();
    },[user]);
    

    const getIndicatorsByUser= async() =>{
        console.log("mesa stin get",user.id)
        try {
            
            console.log("user",user.id)
            console.log("hgertei us id")
            const response = await axios.get(`${apiBaseUrl}/indicatorsByUser/${user.id}`, {timeout: 5000});
            const indData = response.data;

            
            console.log("indicators:",indData);

            const uniqueq4all_Ind_number= [...new Set(indData.map(item => item.q4all_Ind_number || 'N/A'))];
            setQ4AllIndNumber(uniqueq4all_Ind_number);

            const unique_catergory_of_Indicator = [...new Set(indData.map(item => item.catergory_of_Indicator || 'N/A'))]
            set_Category_Of_Indicator(unique_catergory_of_Indicator)

            const unique_type_of_healthcare = [...new Set(indData.map(item => item.type_of_healthcare || 'N/A'))]
            setType_Of_HealthCare(unique_type_of_healthcare)
          
            // Convert sign_date to Date object for each item in ergaData
            const parDataWithDates = indData.map(item => ({
                ...item,
                // erga: {
                //     ...item.erga,
                //     name: item.erga?.name || 'N/A'
                // },
              
                // estimate_payment_date_3:new Date(item.estimate_payment_date_3)
            }));


            setIndicators(parDataWithDates);
    
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    }




    const getIndicators= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/indicators`, {timeout: 5000});
            const indData = response.data;

            
            console.log("indicators:",indData);

            const uniqueq4all_Ind_number= [...new Set(indData.map(item => item.q4all_Ind_number || 'N/A'))];
            setQ4AllIndNumber(uniqueq4all_Ind_number);

            const unique_catergory_of_Indicator = [...new Set(indData.map(item => item.catergory_of_Indicator || 'N/A'))]
            set_Category_Of_Indicator(unique_catergory_of_Indicator)

            const unique_type_of_healthcare = [...new Set(indData.map(item => item.type_of_healthcare || 'N/A'))]
            setType_Of_HealthCare(unique_type_of_healthcare)
          
            // Convert sign_date to Date object for each item in ergaData
            const parDataWithDates = indData.map(item => ({
                ...item,
                // erga: {
                //     ...item.erga,
                //     name: item.erga?.name || 'N/A'
                // },
              
                // estimate_payment_date_3:new Date(item.estimate_payment_date_3)
            }));


            setIndicators(parDataWithDates);
    
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle errors as needed
        }
    }


    const deleteIndicator = async(IndicatorId)=>{
        await axios.delete(`${apiBaseUrl}/indicators/${IndicatorId}`);
        getIndicators();
    }
    const deleteIndicatorsSelected = (ids) => {
        // Assuming you have an API call or logic for deletion
        // Example: If using a REST API for deletion, you might perform a loop or bulk deletion
        if (Array.isArray(ids)) {
            // Handle multiple deletions
            ids.forEach(async (id) => {
                // Existing logic to delete a single Dosi by id, e.g., an API call
                console.log(`Deleting Dosi with ID: ${id}`);
                await axios.delete(`${apiBaseUrl}/indicators/${id}`);

                // Add your deletion logic here
            });
        } else {
            // Fallback for single ID deletion (just in case)
            console.log(`Deleting Dosi with ID: ${ids}`);
            // Add your deletion logic here
        }
    
        // Optionally update your state after deletion to remove the deleted items from the UI
        setIndicators((prevIndicator) => prevIndicator.filter((indicator) => !ids.includes(indicator.id)));
        setSelectedIndicator([]); // Clear selection after deletion
    };



    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            indicator_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            q4all_Ind_number: { value: null, matchMode: FilterMatchMode.IN },
            status: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            indicator_cluster: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            ind_Merge: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            catergory_of_Indicator: { value: null, matchMode: FilterMatchMode.IN },
            dimension: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            type_of_healthcare: { value: null, matchMode: FilterMatchMode.IN },
            type_of_healthcare_providers_D1_D7: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            cross_Cutting_Dimensions_A_I: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            cross_Cutting_Dimensions_Inputs_Process_Outputs: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            dimensions_of_Quality_QoCOfficeReport: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            priority: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            data_collection: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            collecting_National_Organization: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            legal_Organizational_Requirements: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            proponent_Organization_WG: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            rationale_Description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            objective: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            calculation_Formula: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            numerator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            numerator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            denominator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            denominator_Definitions: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            target_Population: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            field_Topic: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            extraCol2: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            periodicity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            data_Collection_Steps: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            legal_Requirements: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            responsible_for_Monitoring: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            deadline_Reporting: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            supervisor_Body: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            management_Entity: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            applicable_period: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            unit_of_Measurement: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            data_Source_Monitoring_Basis: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            it_System_Source: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            reference_Value_Target: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            base_Value: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            notes: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            sources_and_Further_Reading: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            selected_indicator: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            adaptation_Needs: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            piloting: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            opinion_from_ODIPY_Other_experts: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            pilot_outcome: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            pilot_success_criteria: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
     
        setGlobalFilterValue('');
    };

   



    // const clearLocks = () =>
    //     {
    //         setFrozenColumns([]); // Clear all frozen columns
    //     }

        const allColumnFields = ['erga.name', 'erga.shortname'];
        const [frozenColumns, setFrozenColumns] = useState(['erga.name', 'erga.shortname']); // Initially frozen column(s)
        const allColumnsFrozen = frozenColumns.length === allColumnFields.length;
        const buttonLabel = allColumnsFrozen ? 'Unlock All' : 'Lock All';
        // Function to toggle a column's frozen state
        const toggleFreezeColumn = (fieldName) => {
            setFrozenColumns((prev) =>
                prev.includes(fieldName)
                    ? prev.filter(col => col !== fieldName) // Unfreeze column if already frozen
                    : [...prev, fieldName]                  // Freeze column if not frozen
            );
        };
    
         // Function to toggle all columns
         const toggleAllColumns = () => {
            if (allColumnsFrozen) {
                // If all columns are frozen, unlock them
                setFrozenColumns([]);
            } else {
                // If not all columns are frozen, lock all of them
                setFrozenColumns(allColumnFields);
            }
        };
    
        const renderColumnHeader = (headerText, fieldName) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                
                <span
                    onClick={() => toggleFreezeColumn(fieldName)}
                    style={{ cursor: 'pointer', marginRight: '8px' }}
                    title={frozenColumns.includes(fieldName) ? 'Unlock Column' : 'Lock Column'}
                >
                    {frozenColumns.includes(fieldName) ? <i className="pi pi-lock" style={{ fontSize: '1rem' }}></i> : <i className="pi pi-lock-open" style={{ fontSize: '1rem' }}></i>}
                </span>
                <span>{headerText}</span>
            </div>
        );
    
  

    const renderHeader = () => {
        return (
            <div className="header-container flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />

                <Button type="button" outlined label={buttonLabel} icon={buttonLabel === 'Unlock All' ? 'pi pi-unlock' : 'pi pi-lock'} onClick={toggleAllColumns} className="p-mb-3" />
               {/* Responsive Search Field */}
               <div className="responsive-search-field">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Keyword Search"
                        />
                    </IconField>
                </div>
                
                {/* <Button className='action-button'  type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button className='action-button'  type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" /> */}
            </div>
        );
    };
   
    
    const formatDate = (value) => {
        let date = new Date(value);
        let epochDate = new Date('1970-01-01T00:00:00Z');
        if (date.getTime() === epochDate.getTime()) 
        {
            return null;
        }
        if (!isNaN(date)) {
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            
        } else {
            return "Invalid date";
        }
    };
    

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    




    const header = renderHeader();


 

    const ActionsBodyTemplate = (rowData) => {
        const id = rowData.id;
        const op = useRef(null);
        const [hideTimeout, setHideTimeout] = useState(null);
    
        // Show overlay on mouse over
        const handleMouseEnter = (e) => {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                setHideTimeout(null);
            }
            op.current.show(e);
        };
    
        // Hide overlay with delay on mouse leave
        const handleMouseLeave = () => {
            const timeout = setTimeout(() => {
                op.current.hide();
            }, 100); // Adjust delay as needed
            setHideTimeout(timeout);
        };
    
        return (
            <div className="actions-container">
                {/* Three dots button */}
                <Button 
                    icon="pi pi-ellipsis-v" 
                    className="p-button-text"
                    aria-label="Actions"
                    onMouseEnter={handleMouseEnter} // Show overlay on hover
                    onMouseLeave={handleMouseLeave} // Start hide timeout on mouse leave
                />
    
                {/* OverlayPanel containing action buttons in a row */}
                <OverlayPanel 
                    ref={op} 
                    onClick={() => op.current.hide()} 
                    dismissable 
                    onMouseLeave={handleMouseLeave} // Hide on overlay mouse leave
                    onMouseEnter={() => {
                        if (hideTimeout) clearTimeout(hideTimeout);
                    }} // Clear hide timeout on overlay mouse enter
                >
                    <div className="flex flex-row gap-2">
                        {/* Only show the Profile button for non-admin users */}
                        {user && user.role !== "admin" && (
                            <Link to={`/paradotea/profile/${id}`}>
                                <Button icon="pi pi-eye" severity="info" aria-label="User" />
                            </Link>
                        )}
                        
                        {/* Show all action buttons for admin users */}
                        {user && user.role === "admin" && (
                            <>
                                <Button 
                                className='action-button'
                                    icon="pi pi-eye"
                                    severity="info"
                                    aria-label="User"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Profile');
                                        setDialogVisible(true);
                                    }}
                                />
                                <Button
                                className='action-button'
                                    icon="pi pi-pen-to-square"
                                    severity="info"
                                    aria-label="Edit"
                                    onClick={() => {
                                        setSelectedIndicator(id);
                                        setSelectedType('Edit');
                                        setDialogVisible(true);
                                    }}
                                />
                                <Button
                                className='action-button'
                                    icon="pi pi-trash"
                                    severity="danger"
                                    aria-label="Delete"
                                    onClick={() => deleteIndicator(id)}
                                />
                            </>
                        )}
                    </div>
                </OverlayPanel>
            </div>
        );
    };
    const category_of_Indicator_BodyTemplate = (rowData) => 
{
     const category_of_indicators = rowData.catergory_of_Indicator || 'N/A';        // console.log("repsBodytempl",timologio)
        console.log("timologio",category_of_indicators," type ",typeof(category_of_indicators));
        console.log("rep body template: ",category_of_indicators)
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{category_of_indicators}</span>
            </div>
        );
}

const category_of_Indicator_FilterTemplate = (options) =>
{
    console.log('Current timologia filter value:', options.value);
    
    return (<MultiSelect value={options.value} options={category_of_Indicator} itemTemplate={category_of_Indicator_ItemTemplate} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />);
}

const category_of_Indicator_ItemTemplate = (option) => {
        // console.log("itemTemplate",option)
        console.log("rep Item template: ",option)
        console.log("rep Item type: ",typeof(option))
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option}</span>
            </div>
        );
    };

const type_Of_HealthCare_BodyTemplate = (rowData) => 
{
     const type_of_HealthCare = rowData.type_of_healthcare || 'N/A';        // console.log("repsBodytempl",timologio)
        console.log("timologio",type_of_HealthCare," type ",typeof(type_of_HealthCare));
        console.log("rep body template: ",type_of_HealthCare)
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{type_of_HealthCare}</span>
            </div>
        );
}

const type_Of_HealthCare_FilterTemplate = (options) =>
{
    console.log('Current timologia filter value:', options.value);
    
    return (<MultiSelect value={options.value} options={type_of_healthcare} itemTemplate={type_Of_HealthCare_ItemTemplate} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />);
}

const type_Of_HealthCare_ItemTemplate = (option) => {
        // console.log("itemTemplate",option)
        console.log("rep Item template: ",option)
        console.log("rep Item type: ",typeof(option))
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option}</span>
            </div>
        );
    };


const q4all_Ind_number_BodyTemplate = (rowData) => {
        
        const q4all_Ind_numberder = rowData.q4all_Ind_number || 'N/A';        // console.log("repsBodytempl",timologio)
        console.log("timologio",q4all_Ind_numberder," type ",typeof(q4all_Ind_numberder));
        console.log("rep body template: ",q4all_Ind_numberder)
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={representative} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
                <span>{q4all_Ind_numberder}</span>
            </div>
        );
    };



const q4all_Ind_number_FilterTemplate = (options) =>
{
     console.log('Current timologia filter value:', options.value);
    
    return (<MultiSelect value={options.value} options={q4all_Ind_number} itemTemplate={q4all_Ind_numberItemTemplate} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />);
    
}

const q4all_Ind_numberItemTemplate = (option) => {
        // console.log("itemTemplate",option)
        console.log("rep Item template: ",option)
        console.log("rep Item type: ",typeof(option))
    
        return (
            <div className="flex align-items-center gap-2">
                {/* <img alt={option} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" /> */}
                <span>{option}</span>
            </div>
        );
    };


    const isPositiveInteger = (val) => {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, '') || '0';
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    };

    const priceEditor = (options) => {
        return (
            <InputNumber
                value={options.value}
                onValueChange={(e) => options.editorCallback(e.value)}
                mode="currency"
                currency="USD"
                locale="en-US"
                onKeyDown={(e) => e.stopPropagation()}
            />
        );
    };
    const onCellEditComplete = async (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;

        let validEdit = false;
        switch (field) {
            case 'quantity':
            case 'price':
                if (isPositiveInteger(newValue)) {
                    rowData[field] = newValue;
                    validEdit = true;
                } else {
                    event.preventDefault();
                }
                break;

            case 'status': // For dropdown, directly assign the selected value
            if (newValue) {
                rowData[field] = newValue;
                validEdit = true;
            } else {
                event.preventDefault();
            }
            break;

            case 'type_of_healthcare': // For dropdown, directly assign the selected value
            if (newValue) {
                rowData[field] = newValue;
                validEdit = true;
            } else {
                event.preventDefault();
            }
            break;

            case 'dimension': // For dropdown, directly assign the selected value
            if (newValue) {
                rowData[field] = newValue;
                validEdit = true;
            } else {
                event.preventDefault();
            }
            break;

            default:
                if (newValue.trim().length > 0) {
                    rowData[field] = newValue;
                    validEdit = true;
                } else {
                    event.preventDefault();
                }
                break;
        }

        if (validEdit) {
            try {
                // Update the database via an API call
                const response =await axios.patch(`${apiBaseUrl}/indicators/${rowData.id}`, {
                    [field]: newValue
                });

                if (response.status === 200) {
                    console.log('Update successful');
                } else {
                    console.error('Update failed');
                }
            } catch (error) {
                console.error('Error updating the product:', error);
                // Revert to the old value if the update fails
                event.preventDefault();
            }
        }
    };

    const cellEditor = (options) => {
        if (options.field === 'price') return priceEditor(options);
        else if (options.field === 'status') return dropdownEditor(options); // Dropdown editor for category
        else if (options.field === 'type_of_healthcare') return dropdownEditor2(options); // Dropdown editor for domain
        else if (options.field === 'dimension') return dropdownEditor3(options); // Dropdown editor for domain

        else return textEditor(options);
    };
    
    const textEditor = (options) => {
        return (
            <InputText
                type="text"
                value={options.value}
                onChange={(e) => options.editorCallback(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
            />
        );
    };

    const dropdownEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses} // Use the list of options
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a status"
                onKeyDown={(e) => e.stopPropagation()}
            />
        );
    };
    const statusBodyTemplate = (rowData) => {
        const status = statuses.find((cat) => cat.value === rowData.status);
        return status ? status.label : rowData.status; // Display label instead of value
    };

    const dropdownEditor2 = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={domains} // Use the list of options
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a type of healthcare"
                onKeyDown={(e) => e.stopPropagation()}
            />
        );
    };

    const dropdownEditor3 = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={dimensions} // Use the list of options
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Select a dimension"
                onKeyDown={(e) => e.stopPropagation()}
            />
        );
    };

    const domainBodyTemplate = (rowData) => {
        const domain = domains.find((cat) => cat.value === rowData.type_of_healthcare);
        return domain ? domain.label : rowData.type_of_healthcare; // Display label instead of value
    };


    const dimensionBodyTemplate = (rowData) => {
        const dimension = dimensions.find((cat) => cat.value === rowData.dimension);
        return dimension ? dimension.label : rowData.dimension; // Display label instead of value
    };



    

    const addEmptyRow = async () => {
        try {
            // Send a request to create a new empty row in the database
            const response = await axios.post(`${apiBaseUrl}/indicators`, {
                indicator_name: '',
                q4all_Ind_number: '',
                status: '',
                indicator_cluster: '',
                ind_Merge: '',
                catergory_of_Indicator: '',
                dimension: '',
                type_of_healthcare: '',
                type_of_healthcare_providers_D1_D7: '',
                cross_Cutting_Dimensions_A_I: '',
                cross_Cutting_Dimensions_Inputs_Process_Outputs: '',
                dimensions_of_Quality_QoCOfficeReport: '',
                priority: null,
                data_collection: '',
                collecting_National_Organization: '',
                legal_Organizational_Requirements: null,
                proponent_Organization_WG: '',
                rationale_Description: '',
                objective: '',
                calculation_Formula: '',
                numerator: '',
                numerator_Definitions: '',
                denominator: '',
                denominator_Definitions: '',
                target_Population: '',
                field_Topic: '',
                extraCol2: '',
                periodicity: '',
                data_Collection_Steps: '',
                legal_Requirements: '',
                responsible_for_Monitoring: '',
                deadline_Reporting: '',
                supervisor_Body: '',
                management_Entity: '',
                applicable_period: '',
                unit_of_Measurement: '',
                data_Source_Monitoring_Basis: '',
                it_System_Source: '',
                reference_Value_Target: '',
                base_Value: '',
                notes: '',
                sources_and_Further_Reading: '',
                selected_indicator: '',
                adaptation_Needs: '',
                piloting: '',
                opinion_from_ODIPY_Other_experts: '',
                pilot_outcome: '',
                pilot_success_criteria: ''
            });
    
            // Assuming the response contains the new row data, add it to the table
            const newRow = response.data; // Assuming the newly created row is returned from the backend
            console.log(newRow)
            setIndicators((prevIndicators) => [...prevIndicators, newRow]); // Add to the current list of indicators
    
        } catch (error) {
            console.error('Error adding new row:', error);
        }
    };
    


    return(
        <div className="card" >
        <h1 className='title'>Indicators Table</h1>
        <div className='d-flex align-items-center gap-4'>
        {user && user.role ==="admin" && (
        <Link to={"/indicators/add"} className='button is-primary mb-2'><Button label="New Indicator row" className='rounded' icon="pi pi-plus-circle"/></Link>
        )}

     {selectedIndicator.length > 0 && (
            <Button
                className='button is-primary mb-2 rounded' 
                label="Delete Selected" 
                icon="pi pi-trash" 
                severity="danger" 
                onClick={() => deleteIndicatorsSelected(selectedIndicator.map(indicator => indicator.id))} // Pass an array of selected IDs
            />

            
        )} 

        {/* New Empty Row Button */}
        {user && user.role === "admin" && (
                <Button
                    label="New Empty Row"
                    className="button is-primary mb-2 rounded"
                    icon="pi pi-plus-circle"
                    onClick={addEmptyRow} // Trigger the addEmptyRow function
                />
            )}

        </div>



<DataTable value={indicators}  editMode="cell" ref = {dt} onValueChange={(indicators) => setFilteredIndicators(indicators)} paginator stripedRows
 rows={25} scrollable scrollHeight="600px" loading={loading} dataKey="id" 
            filters={filters} 
            globalFilterFields={['id', 'indicator_name',  'q4all_Ind_number',
                 'status', 'indicator_cluster',      'ind_Merge',   'catergory_of_Indicator',   'dimension',     
                   'type_of_healthcare',  'type_of_healthcare_providers_D1_D7',  'cross_Cutting_Dimensions_A_I', 
                    'cross_Cutting_Dimensions_Inputs_Process_Outputs',   'dimensions_of_Quality_QoCOfficeReport', 
                      'priority',  'data_collection',     'collecting_National_Organization',  
                        'legal_Organizational_Requirements',    'proponent_Organization_WG',  
                         'rationale_Description', 'objective',   'calculation_Formula',   
                      'numerator','numerator_Definitions', 'denominator','denominator_Definitions', 
                      'target_Population', 'field_Topic', 'extraCol2', 'periodicity', 'data_Collection_Steps', 
                      'legal_Requirements', 'responsible_for_Monitoring', 'deadline_Reporting', 'supervisor_Body', 
                      'management_Entity', 'applicable_period', 'unit_of_Measurement', 'data_Source_Monitoring_Basis',
                       'it_System_Source', 'reference_Value_Target', 'base_Value', 'notes', 'sources_and_Further_Reading',
                        'selected_indicator', 'adaptation_Needs', 'piloting', 'opinion_from_ODIPY_Other_experts',
                         'pilot_outcome', 'pilot_success_criteria' ]} 
            header={header} 
            emptyMessage="No customers found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            >
            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} frozen></Column>

            <Column className='font-bold' field="id" header="id" sortable style={{ minWidth: '2rem', color: 'black' }} frozen ></Column>

            <Column field="indicator_name"  header={customHeader("Indicator Name", "The specific name used to identify the Key Performance Indicator (KPI).","indicator_name")} filter filterPlaceholder="Search by Indicator Name" style={{ minWidth: '18rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="q4all_Ind_number" header={customHeader("Q4All Indicator Number", "This will be a internal Number for indicators of 'Q4ALL Q4Alln.xxxx' with 4 digitis","q4all_Ind_number")} filter filterField='q4all_Ind_number' filterElement={q4all_Ind_number_FilterTemplate} showFilterMatchModes={false} body={q4all_Ind_number_BodyTemplate} style={{ minWidth: '21rem' }}></Column>
            <Column field="status" header={customHeader("Status", "Proposed; Draft; Formally approved; Piloting; Deployed","status")} filter filterPlaceholder="Search by Status" style={{ minWidth: '12rem' }}  body={statusBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="indicator_cluster" header={customHeader("Indicator Cluster", "Cluster of a set of related indicators that share common aspects (group of indicators of related categories)","indicator_cluster")} filter filterPlaceholder="Search by Indicator Cluster" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="ind_Merge" header={customHeader("Indicator Merge",`If 2 indicadors are "merged" the one with the lowest number remains and th other ir "inactive";  e.g.  Q4Alln.000x   + Q4Alln.00xy --> Q4Alln.000x  - text is adjusted and the "inactivated indicator line of cells is colored light grey` ,"ind_Merge")}filter filterPlaceholder="Search by Indicator Merge" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="catergory_of_Indicator"  header={customHeader("Category of Indicator","The origin or source of inspiration for the KPI, such as whether it is adapted from another country's indicator, an international standard, or developed internally." ,"catergory_of_Indicator")} filter filterField='catergory_of_Indicator' filterElement={category_of_Indicator_FilterTemplate} showFilterMatchModes={false} body={category_of_Indicator_BodyTemplate} style={{ minWidth: '12rem' }}></Column>
            <Column field="dimension"  header={customHeader("Dimension","The aspect of healthcare quality the indicator measures, e.g., safety, effectiveness,  etc." ,"dimension")} filter filterPlaceholder="Search by Dimension" style={{ minWidth: '12rem' }}  body={dimensionBodyTemplate} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="type_of_healthcare" header={customHeader("Type of Healthcare", `D1: Secundary Healthcare ( all hospitals, secundary and tertiary hospitals, hospital at home, telehealth services, data from wearables)
D2: Home/telecare and Ative life (hospital at home, telehealth services, data from wearables, health at home social service)
D3: Primary Care (342 health centers; 127 TOMY local health units; 110 COMY mobile health units; Outpatient prescription)
D4: Public health indicators (EODY-national center of public health; with-- ODIPY - hospital infections; IDIKA (HIV registy and COVID19 )
D5: NCDs and Mental Health (diganosis of NCDs in drug prescrition; healthstat, perceptions, service use, drugs use, mental health clinics of univ hosp, and 3 phychiatry hospitals), day care centers for mental health units?
D6: Paliative and Long term care
D7: All domains`,"type_of_healthcare")} filter filterField = 'type_of_healthcare' filterElement={type_Of_HealthCare_FilterTemplate} showFilterMatchModes={false} style={{ minWidth: '10rem' }} body={domainBodyTemplate}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            
            <Column field="type_of_healthcare_providers_D1_D7" header={customHeader("Type of Healthcare Providers", `D1: Secundary Healthcare ( all hospitals, secundary and tertiary hospitals, hospital at home, telehealth services, data from wearables)
D2: Home/telecare and Ative life (hospital at home, telehealth services, data from wearables, health at home social service)
D3: Primary Care (342 health centers; 127 TOMY local health units; 110 COMY mobile health units; Outpatient prescription)
D4: Public health indicators (EODY-national center of public health; with-- ODIPY - hospital infections; IDIKA (HIV registy and COVID19 )
D5: NCDs and Mental Health (diganosis of NCDs in drug prescrition; healthstat, perceptions, service use, drugs use, mental health clinics of univ hosp, and 3 phychiatry hospitals), day care centers for mental health units?
D6: Paliative and Long term care
D7: All domains` ,"type_of_healthcare_providers_D1_D7")} filter filterPlaceholder="Search by Healthcare Providers" style={{ minWidth: '12rem' }}></Column>
            
            <Column field="cross_Cutting_Dimensions_A_I"  header={customHeader("Cross Cutting Dimensions A-I",`Classification according to Dimensions: 
A_Inputs_Workforce (Quantity/Training; capacity building)
B_Inputs_Social determinants of health and care
C_Process_Equity (gender balance, minorities, migrants)
D_Process_Access
H_Process_Patient Experience
E_Process_Cost containing and efficiency
F_Process_Green and sustainability
G_Process_Digital and healthcare transformation
H_Outputs_Patient Satisfaction
I_Outputs Health Gains` ,"cross_Cutting_Dimensions_A_I")} filter filterPlaceholder="Search by Cross Cutting Dimensions A-I" style={{ minWidth: '12rem' }}></Column>
            
            <Column field="cross_Cutting_Dimensions_Inputs_Process_Outputs" header={customHeader("Cross Cutting Dimensions Inputs/Outputs","Classification according to: Inputs; Process; Outputs" ,"cross_Cutting_Dimensions_Inputs_Process_Outputs")}
 filter filterPlaceholder="Search by Inputs/Outputs" style={{ minWidth: '12rem' }}></Column>

            <Column field="dimensions_of_Quality_QoCOfficeReport" header={customHeader("Dimensions of Quality",`Classification according to QoCOfficeReport:
Efficiency
Access
Equity
User experience 
Effectiveness 
Safety` ,"dimensions_of_Quality_QoCOfficeReport")} filter filterPlaceholder="Search by Dimensions of Quality" style={{ minWidth: '12rem' }}></Column>
            <Column field="priority"  header={customHeader("Priority",`Classification regarding Priority taking into account AIM of Q4All platforma and HealthIQ project overal:
 1- 1st priority (very useful and somehow tangible);
 2 - 2nd priority (useful and with some dificulties); 
 3 3rd priority  (interesting but very dificult) ==== target for "proposed indicators" 180 of cat 1; 100 cat 2 ; 20 cat 3;` ,"priority")} filter filterPlaceholder="Search by Priority" style={{ minWidth: '12rem' }}></Column>
            <Column field="data_collection" header={customHeader("Data Collection",`AUTOMATED (Pre-existing data Source/System): There is a pre-existing data source that could totally or partially cover data needed to use this indicator in the Greek context
MANUAL: Data needs to be collected manually, and retrived by an existing system (e.g. MoH BI, other) or NEW System
AUTOMATED NEW / INNOVATIVE: Data needs to be collected in an innovative manner (e.g. collecting "nº steps" from each greek person via connecting their phones' pedometer to a system that collects that for a large sample in real time` ,"data_collection")} filter filterPlaceholder="Search by Data Collection" style={{ minWidth: '12rem' }}></Column>
            <Column field="collecting_National_Organization" header={customHeader("Collecting Organization","Name (ideally also system) of the National Level Organization that collects data related to the proposed indicator" ,"collecting_National_Organization")} filter filterPlaceholder="Search by Collecting Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="legal_Organizational_Requirements"  header={customHeader("Legal Requirements",`1 - No need
2 - Legal base exist but needs to be "operationalized" via a guideline/regulation by ODYPI/Other org
3 - New Legal base is needed (MoH order)
4 - New Legal base is needed (Law)` ,"legal_Organizational_Requirements")} filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }}></Column>
            <Column field="proponent_Organization_WG" header={customHeader("Proponent Organization","Organization or team that proposed or supports the use of this indicator.","proponent_Organization_WG")} filter filterPlaceholder="Search by Proponent Organization" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="rationale_Description"  header={customHeader("Rationale Description","Can be created from formula…" ,"rationale_Description")} filter filterPlaceholder="Search by Rationale Description" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="objective"  header={customHeader("Objective","The specific goal this indicator aims to achieve in terms of healthcare outcomes or performance improvement." ,"objective")}  filter filterPlaceholder="Search by Objective" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="calculation_Formula"   header={customHeader("Calculation Formula","The mathematical equation or method used to compute the indicator’s value." ,"calculation_Formula")}   filter filterPlaceholder="Search by Calculation Formula" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="numerator"  header={customHeader("Numerator","The top part of the calculation." ,"numerator")}  filter filterPlaceholder="Search by Numerator" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="numerator_Definitions"   header={customHeader("Numerator Definitions","Detailed explanation of what is counted in the numerator and how it is measured." ,"numerator_Definitions")}  filter filterPlaceholder="Search by Numerator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="denominator"  header={customHeader("Denominator","The bottom part of the calculation." ,"denominator")}  filter filterPlaceholder="Search by Denominator" style={{ minWidth: '12rem' }}  editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="denominator_Definitions" header={customHeader("Denominator Definitions","Detailed explanation of what is included in the denominator and how it is measured." ,"denominator_Definitions")}   filter filterPlaceholder="Search by Denominator Definitions" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="target_Population"  header={customHeader("Target Population","The group of patients or institutions to which the indicator applies." ,"target_Population")} filter filterPlaceholder="Search by Target Population" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="field_Topic" header="Field Topic" filter filterPlaceholder="Search by Field Topic" style={{ minWidth: '12rem' }}></Column>
            <Column field="extraCol2" header="Extra Column 2" filter filterPlaceholder="Search by Extra Column 2" style={{ minWidth: '12rem' }}></Column>
            <Column field="periodicity"  header={customHeader("Periodicity","How often the data for this indicator is collected, e.g., weekly, monthly, quarterly, annually , etc." ,"periodicity")} filter filterPlaceholder="Search by Periodicity" style={{ minWidth: '12rem' }} ></Column>
            <Column field="data_Collection_Steps"  header={customHeader("Data Collection Steps","The specific procedures and actions required to gather data for this indicator." ,"data_Collection_Steps")} filter filterPlaceholder="Search by Data Collection Steps" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="legal_Requirements" header={customHeader("Legal Requirements","Any laws, regulations, or standards that mandate the use or reporting of this indicator." ,"legal_Requirements")} filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="responsible_for_Monitoring" header={customHeader("Responsible for Monitoring","Organization, department, or team accountable for tracking and evaluating this indicator. (In the field)" ,"responsible_for_Monitoring")} filter filterPlaceholder="Search by Responsible for Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>




            <Column field="deadline_Reporting" header={customHeader("Deadline Reporting","The time frame or specific date by which the data for this indicator must be reported." ,"deadline_Reporting")}  filter filterPlaceholder="Search by Deadline Reporting" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="supervisor_Body" header={customHeader("Supervisor Body","The external entity responsible for overseeing the monitoring of the indicator." ,"supervisor_Body")} filter filterPlaceholder="Search by Supervisor Body" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="management_Entity" header={customHeader("Management Entity","The organization in charge of managing the indicator and ensuring it meets its objectives." ,"management_Entity")} filter filterPlaceholder="Search by Management Entity" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="applicable_period" header={customHeader("Applicable Period","The time range during which this indicator is relevant or active for measurement and reporting." ,"applicable_period")} filter filterPlaceholder="Search by Applicable Period" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="unit_of_Measurement" header={customHeader("Unit of Measurement","The metric or unit used to express the value of the indicator (e.g., percentage, number of events)." ,"data_Source_Monitoring_Basis")} filter filterPlaceholder="Search by Unit of Measurement" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete} ></Column>
            <Column field="data_Source_Monitoring_Basis" header={customHeader("Data Source Monitoring","The origin of the data used to calculate the indicator, such as patient records, surveys, or administrative data." ,"data_Source_Monitoring_Basis")} filter filterPlaceholder="Search by Data Source Monitoring" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="it_System_Source" header="IT System Source" filter filterPlaceholder="Search by IT System Source" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="reference_Value_Target" header={customHeader("Reference Value Target","The desired or expected value of the indicator, often set as a target for performance improvement." ,"reference_Value_Target")} filter filterPlaceholder="Search by Reference Value Target" style={{ minWidth: '12rem' }}></Column>
            <Column field="base_Value" header={customHeader("Base Value","The initial value of the indicator before any improvement initiatives, used as a comparison point." ,"base_Value")} filter filterPlaceholder="Search by Base Value" style={{ minWidth: '12rem' }}></Column>
            <Column field="notes" header={customHeader("Notes","Additional information or clarifications related to the indicator." ,"notes")} filter filterPlaceholder="Search by Notes" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="sources_and_Further_Reading" header={customHeader("Sources and Further Reading","References to documents, studies, or websites that provide more information about the indicator." ,"sources_and_Further_Reading")} filter filterPlaceholder="Search by Sources and Further Reading" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="selected_indicator" header={customHeader("Selected Indicator",`
YES - the Potential Indicator is considered useful, feasible, and can be adjusted to the Greek context;
NO - the Potential Indicator does not seem relevant for Q4All now or in the near (2y) future;
MAYBE - the Potential Indicator can be useful IF a certain set of conditions (e.g. data collection, legal basis, etc ) are changed` ,"selected_indicator")} filter filterPlaceholder="Search by Selected Indicator" style={{ minWidth: '12rem' }}></Column>
            <Column field="adaptation_Needs" header={customHeader("Adaptation Needs","brief description of the NEEDS to adapt the suugested indicator to the Greek Context and Q4ALL/healthIQ aims" ,"adaptation_Needs")} filter filterPlaceholder="Search by Adaptation Needs" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="piloting" header={customHeader("Piloting",`
YES - This "SELECTED INDICATOR" as is to be included in the Pilot;
NO - this "SELECTED INDICATOR" is NOT to be included in the Pilot;
N/A - this "SELECTED INDICATOR" is to be used but does not need to be included in the pilot` ,"piloting")} filter filterPlaceholder="Search by Piloting" style={{ minWidth: '12rem' }}></Column>
            <Column field="opinion_from_ODIPY_Other_experts" header={customHeader("Expert Opinion","Opinion from ODIPY, and any other experts, including the endorsement/refusal from HealthIQ mission experts" ,"opinion_from_ODIPY_Other_experts")} filter filterPlaceholder="Search by Expert Opinion" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            <Column field="pilot_outcome" header={customHeader("Pilot Outcome",`1 - MAINTAIN AS IS;
2- MAINTAIN but adjust - (add coluns to the right with changes) ;
3 - SUSPEND` ,"pilot_outcome")} filter filterPlaceholder="Search by Pilot Outcome" style={{ minWidth: '12rem' }}></Column>
            <Column field="pilot_success_criteria" header={customHeader("Pilot Success Criteria","TBD at a later stage - ideas can be listed in cells below" ,"pilot_success_criteria")} filter filterPlaceholder="Search by Success Criteria" style={{ minWidth: '12rem' }} editor={(options) => cellEditor(options)} onCellEditComplete={onCellEditComplete}></Column>
            
            <Column header="Ενέργειες" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen headerStyle={{ backgroundImage: 'linear-gradient(to right, #1400B9, #00B4D8)', color: '#ffffff' }}/>

 </DataTable>

    {/* Dialog for editing Paradotea */}
    

        
       
    </div>
    )
}

export default IndicatorsList;
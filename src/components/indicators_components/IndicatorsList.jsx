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

const IndicatorsList = () => {
    const [indicators, setIndicators] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
  
    const [filteredIndicators, setFilteredIndicators] = useState([]);
    


    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedIndicatorId, setSelectedIndicatorId] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedIndicator, setSelectedIndicator] = useState([]);


    const dt = useRef(null);





 



        
   

    const formatCurrencyReport = (value) => {
        return Number(value);
    };

    useEffect(()=>{
        getIndicators()
        setLoading(false);
        initFilters();
    },[]);

    const getIndicators= async() =>{
        try {
            const response = await axios.get(`${apiBaseUrl}/indicators`, {timeout: 5000});
            const indData = response.data;
            console.log("indicators:",indData);
            // Extract unique statuses
            //const uniqueProjectManager = [...new Set(ergaData.map(item => item.project_manager))];
            // const uniqueTimologia = [...new Set(paraData.map(item => item.timologia?.invoice_number || 'N/A'))];
        
            // console.log("Unique Timologia:",uniqueTimologia);
            // setTimologio(uniqueTimologia);

            // const uniqueErga= [...new Set(paraData.map(item => item.erga?.name || 'N/A'))];
            // setErgo(uniqueErga);

            // const uniqueErgaShort= [...new Set(paraData.map(item => item.erga?.shortname || 'N/A'))];
            // setErgoShort(uniqueErgaShort);

            // Convert sign_date to Date object for each item in ergaData
            const parDataWithDates = indData.map(item => ({
                ...item,
                // erga: {
                //     ...item.erga,
                //     name: item.erga?.name || 'N/A'
                // },
                // timologia: {
                //     ...item.timologia,
                //     invoice_number: item.timologia?.invoice_number || 'N/A'
                // },
                // delivery_date: new Date(item.delivery_date),
                // ammount: parseFloat(item.ammount),
                // ammount_vat: parseFloat(item.ammount_vat),
                // ammount_total: parseFloat(item.ammount_total),
                // estimate_payment_date: new Date(item.estimate_payment_date),
                // estimate_payment_date_2:new Date(item.estimate_payment_date_2),
                // estimate_payment_date_3:new Date(item.estimate_payment_date_3)
            }));


            // const sortedParaData = parDataWithDates.sort((a, b) => a.delivery_date - b.delivery_date);

    
            // console.log(sortedParaData); 
            // Optionally log the transformed data
    
            // Assuming you have a state setter like setErga defined somewhere
            setIndicators(parDataWithDates);
            // setFilteredParadotea(sortedParaData)
    
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
            // part_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // percentage: { value: null, matchMode: FilterMatchMode.IN },
            // delivery_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            // ammount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            
            
            // ammount_vat: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            // ammount_total: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },

            // estimate_payment_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            // estimate_payment_date_2: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            // estimate_payment_date_3: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },

            // comments: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

            
            // 'erga.name':{ value: null, matchMode: FilterMatchMode.IN },
            // 'erga.shortname':{ value: null, matchMode: FilterMatchMode.IN },
            // 'timologia.invoice_number':  { value: null, matchMode: FilterMatchMode.IN },
            

        });
        setGlobalFilterValue('');
    };


 

    const {user} = useSelector((state)=>state.auth)

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





    const ammountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.ammount);
    };

    const ammount_vatBodyTemplate = (rowData) => {
        return formatCurrency(rowData.ammount_vat);
    };

    const ammount_totalBodyTemplate = (rowData) => {
        return formatCurrency(rowData.ammount_total);
    };

    const ammountFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="EUR" locale="en-US" />;
    };


  

 //delivery Date
 const deliveryDateBodyTemplate = (rowData) => {
    return formatDate(rowData.delivery_date);
};

const deliveryDateFilterTemplate = (options) => {
    console.log('Current filter value:', options);

    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};




//Estimate Payment 
const estimatePaymentDateBodyTemplate = (rowData) => {
    return formatDate(rowData.estimate_payment_date);
};

const estimatePaymentDateFilterTemplate = (options) => {
    console.log('Current filter value:', options);

    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};

 //Estimate Payment 2
 const estimatePaymentDateBodyTemplate2 = (rowData) => {
    return formatDate(rowData.estimate_payment_date_2);
};

const estimatePaymentDateFilterTemplate2 = (options) => {
    console.log('Current filter value:', options);

    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
};

//Estimate Payment 3
const estimatePaymentDateBodyTemplate3= (rowData) => {
    return formatDate(rowData.estimate_payment_date_3);
};

const estimatePaymentDateFilterTemplate3= (options) => {
    console.log('Current filter value:', options);

    return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
}


//erga

const ergaBodyTemplate = (rowData) => {
        
    const ergo = rowData.erga?.name || 'N/A';        // console.log("repsBodytempl",timologio)
    console.log("timologio",ergo," type ",typeof(ergo));
    console.log("rep body template: ",ergo)

    return (
        <div className="flex align-items-center gap-2">
            {/* <img alt={representative} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
            <span>{ergo}</span>
        </div>
    );
};

// const ergaFilterTemplate = (options) => {
//     console.log('Current timologia filter value:', options.value);

//         return (<MultiSelect value={options.value} options={erga} itemTemplate={ergaItemTemplate} onChange={(e) => options.filterCallback(e.value)} placeholder="Any" className="p-column-filter" />);

//     };


const ergaItemTemplate = (option) => {
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

//shortname

const shortnameBodyTemplate = (rowData) => {
        
    const ergo = rowData.erga?.shortname || 'N/A';        // console.log("repsBodytempl",timologio)
    console.log("timologio",ergo," type ",typeof(ergo));
    console.log("rep body template: ",ergo)

    return (
        <div className="flex align-items-center gap-2">
            {/* <img alt={representative} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" /> */}
            <span>{ergo}</span>
        </div>
    );
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


    


    return(
        <div className="card" >
        <h1 className='title'>Δείκτες</h1>
        <div className='d-flex align-items-center gap-4'>
        {user && user.role ==="admin" && (
        <Link to={"/paradotea/add"} className='button is-primary mb-2'><Button label="Προσθήκη Νεου Παραδοτέου" className='rounded' icon="pi pi-plus-circle"/></Link>
        )}

     {selectedIndicator.length > 0 && (
            <Button
                className='button is-primary mb-2 rounded' 
                label="Delete Selected" 
                icon="pi pi-trash" 
                severity="danger" 
                onClick={() => deleteIndicatorsSelected(selectedIndicator.map(indicator => indicator.id))} // Pass an array of selected IDs
            />
        )} *

        </div>



<DataTable value={indicators} ref = {dt} onValueChange={(indicators) => setFilteredIndicators(indicators)} paginator stripedRows
 rows={20} scrollable scrollHeight="600px" loading={loading} dataKey="id" 
            filters={filters} 
            globalFilterFields={['id', 'indicator_name', 
                
                ]} 
            header={header} 
            emptyMessage="No customers found."
            selection={selectedIndicator} 
            onSelectionChange={(e) => setSelectedIndicator(e.value)} // Updates state when selection changes
            selectionMode="checkbox"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }} frozen></Column>

                <Column className='font-bold' field="id" header="id" sortable style={{ minWidth: '2rem', color: 'black' }} frozen ></Column>
                {/* <Column className="font-bold" header={renderColumnHeader('Έργα', 'erga.name')}
                frozen={frozenColumns.includes('erga.name')} filterField="erga.name" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem', color: 'black' }}
                    body={ergaBodyTemplate} filter filterElement={ergaFilterTemplate} />   */}
                {/* <Column className="font-bold" header={renderColumnHeader('Ακρόνυμο έργου', 'erga.shortname')} filterField="erga.shortname" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem', color: 'black' }}
                    body={shortnameBodyTemplate} filter filterElement={shortnameFilterTemplate} frozen={frozenColumns.includes('erga.shortname')} />   */}

                {/* <Column field="indicator_name"  header="Παραδοτέο (Αριθμός)"  filter filterPlaceholder="Search by part number" style={{ minWidth: '12rem' }}></Column> */}
                {/* <Column field="title" header="Τίτλος παραδοτέου"  filter filterPlaceholder="Search by title"  style={{ minWidth: '12rem' }}></Column>
                <Column header="Ημερομηνία υποβολής" filterField="delivery_date" dataType="date" style={{ minWidth: '5rem' }} body={deliveryDateBodyTemplate} filter filterElement={deliveryDateFilterTemplate} ></Column>

                <Column field="percentage" header="Ποσοστό σύμβασης"  style={{ minWidth: '12rem' }}></Column> */}
                {/* <Column field="ammount" header="ammount"  style={{ minWidth: '12rem' }} body={priceBodyTemplate}></Column>

                {/* <Column header="Ποσό  (καθαρή αξία)" filterField="ammount" dataType="numeric" style={{ minWidth: '5rem' }} body={ammountBodyTemplate} filter filterElement={ammountFilterTemplate} />
                <Column header="Ποσό ΦΠΑ " filterField="ammount_vat" dataType="numeric" style={{ minWidth: '5rem' }} body={ammount_vatBodyTemplate} filter filterElement={ammountFilterTemplate} />
                <Column header="Σύνολο" filterField="ammount_total" dataType="numeric" style={{ minWidth: '5rem' }} body={ammount_totalBodyTemplate} filter filterElement={ammountFilterTemplate} />
       
                <Column header="Ημερομηνία πληρωμής (εκτίμηση)" filterField="estimate_payment_date" dataType="date" style={{ minWidth: '5rem' }} body={estimatePaymentDateBodyTemplate} filter filterElement={estimatePaymentDateFilterTemplate} ></Column>
                <Column header="Ημερομηνία πληρωμής  (εκτίμηση 2)" filterField="estimate_payment_date_2" dataType="date" style={{ minWidth: '5rem' }} body={estimatePaymentDateBodyTemplate2} filter filterElement={estimatePaymentDateFilterTemplate2} ></Column>
                <Column header="Ημερομηνία πληρωμής  (εκτίμηση 3)" filterField="estimate_payment_date_3" dataType="date" style={{ minWidth: '5rem' }} body={estimatePaymentDateBodyTemplate3} filter filterElement={estimatePaymentDateFilterTemplate3} ></Column>
               
                <Column field="comments" header="Σχόλιο"  filter filterPlaceholder="Search by comments"  style={{ minWidth: '12rem' }}></Column> */} 

                {/* <Column  field="delivery_date" header="delivery_date" dataType="date" style={{ minWidth: '10rem' }} ></Column> */}
                {/* <Column field="erga_id" header="erga_id" dataType="numeric"  sortable style={{ minWidth: '2rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate}  ></Column> */}
                {/* <Column header="erga.name" filterField="erga.name" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                   ></Column>
                 */}
                <Column field="indicator_name" header="Indicator Name" filter filterPlaceholder="Search by Indicator Name" style={{ minWidth: '12rem' }}></Column>
                <Column field="q4all_Ind_number" header="Q4All Indicator Number" filter filterPlaceholder="Search by Q4All Indicator Number" style={{ minWidth: '12rem' }}></Column>
                <Column field="status" header="Status" filter filterPlaceholder="Search by Status" style={{ minWidth: '12rem' }}></Column>
                <Column field="indicator_cluster" header="Indicator Cluster" filter filterPlaceholder="Search by Indicator Cluster" style={{ minWidth: '12rem' }}></Column>
                <Column field="ind_Merge" header="Indicator Merge" filter filterPlaceholder="Search by Indicator Merge" style={{ minWidth: '12rem' }}></Column>
                <Column field="catergory_of_Indicator" header="Category of Indicator" filter filterPlaceholder="Search by Category of Indicator" style={{ minWidth: '12rem' }}></Column>
                <Column field="dimension" header="Dimension" filter filterPlaceholder="Search by Dimension" style={{ minWidth: '12rem' }}></Column>
                <Column field="type_of_healthcare" header="Type of Healthcare" filter filterPlaceholder="Search by Type of Healthcare" style={{ minWidth: '12rem' }}></Column>
                <Column field="type_of_healthcare_providers_D1_D7" header="Type of Healthcare Providers" filter filterPlaceholder="Search by Healthcare Providers" style={{ minWidth: '12rem' }}></Column>
                <Column field="cross_Cutting_Dimensions_A_I" header="Cross Cutting Dimensions A-I" filter filterPlaceholder="Search by Cross Cutting Dimensions A-I" style={{ minWidth: '12rem' }}></Column>
                <Column field="cross_Cutting_Dimensions_Inputs_Process_Outputs" header="Cross Cutting Dimensions Inputs/Outputs" filter filterPlaceholder="Search by Inputs/Outputs" style={{ minWidth: '12rem' }}></Column>
                <Column field="dimensions_of_Quality_QoCOfficeReport" header="Dimensions of Quality" filter filterPlaceholder="Search by Dimensions of Quality" style={{ minWidth: '12rem' }}></Column>
                <Column field="priority" header="Priority" filter filterPlaceholder="Search by Priority" style={{ minWidth: '12rem' }}></Column>
                <Column field="data_collection" header="Data Collection" filter filterPlaceholder="Search by Data Collection" style={{ minWidth: '12rem' }}></Column>
                <Column field="collecting_National_Organization" header="Collecting Organization" filter filterPlaceholder="Search by Collecting Organization" style={{ minWidth: '12rem' }}></Column>
                <Column field="legal_Organizational_Requirements" header="Legal Requirements" filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }}></Column>
                <Column field="proponent_Organization_WG" header="Proponent Organization" filter filterPlaceholder="Search by Proponent Organization" style={{ minWidth: '12rem' }}></Column>
                <Column field="rationale_Description" header="Rationale Description" filter filterPlaceholder="Search by Rationale Description" style={{ minWidth: '12rem' }}></Column>
                <Column field="objective" header="Objective" filter filterPlaceholder="Search by Objective" style={{ minWidth: '12rem' }}></Column>
                <Column field="calculation_Formula" header="Calculation Formula" filter filterPlaceholder="Search by Calculation Formula" style={{ minWidth: '12rem' }}></Column>
                <Column field="numerator" header="Numerator" filter filterPlaceholder="Search by Numerator" style={{ minWidth: '12rem' }}></Column>
                <Column field="numerator_Definitions" header="Numerator Definitions" filter filterPlaceholder="Search by Numerator Definitions" style={{ minWidth: '12rem' }}></Column>
                <Column field="denominator" header="Denominator" filter filterPlaceholder="Search by Denominator" style={{ minWidth: '12rem' }}></Column>
                <Column field="denominator_Definitions" header="Denominator Definitions" filter filterPlaceholder="Search by Denominator Definitions" style={{ minWidth: '12rem' }}></Column>
                <Column field="target_Population" header="Target Population" filter filterPlaceholder="Search by Target Population" style={{ minWidth: '12rem' }}></Column>
                <Column field="field_Topic" header="Field Topic" filter filterPlaceholder="Search by Field Topic" style={{ minWidth: '12rem' }}></Column>
                <Column field="extraCol2" header="Extra Column 2" filter filterPlaceholder="Search by Extra Column 2" style={{ minWidth: '12rem' }}></Column>
                <Column field="periodicity" header="Periodicity" filter filterPlaceholder="Search by Periodicity" style={{ minWidth: '12rem' }}></Column>
                <Column field="data_Collection_Steps" header="Data Collection Steps" filter filterPlaceholder="Search by Data Collection Steps" style={{ minWidth: '12rem' }}></Column>
                <Column field="legal_Requirements" header="Legal Requirements" filter filterPlaceholder="Search by Legal Requirements" style={{ minWidth: '12rem' }}></Column>
                <Column field="responsible_for_Monitoring" header="Responsible for Monitoring" filter filterPlaceholder="Search by Responsible for Monitoring" style={{ minWidth: '12rem' }}></Column>
                <Column field="deadline_Reporting" header="Deadline Reporting" filter filterPlaceholder="Search by Deadline Reporting" style={{ minWidth: '12rem' }}></Column>
                <Column field="supervisor_Body" header="Supervisor Body" filter filterPlaceholder="Search by Supervisor Body" style={{ minWidth: '12rem' }}></Column>
                <Column field="management_Entity" header="Management Entity" filter filterPlaceholder="Search by Management Entity" style={{ minWidth: '12rem' }}></Column>
                <Column field="applicable_period" header="Applicable Period" filter filterPlaceholder="Search by Applicable Period" style={{ minWidth: '12rem' }}></Column>
                <Column field="unit_of_Measurement" header="Unit of Measurement" filter filterPlaceholder="Search by Unit of Measurement" style={{ minWidth: '12rem' }}></Column>
                <Column field="data_Source_Monitoring_Basis" header="Data Source Monitoring" filter filterPlaceholder="Search by Data Source Monitoring" style={{ minWidth: '12rem' }}></Column>
                <Column field="it_System_Source" header="IT System Source" filter filterPlaceholder="Search by IT System Source" style={{ minWidth: '12rem' }}></Column>
                <Column field="reference_Value_Target" header="Reference Value Target" filter filterPlaceholder="Search by Reference Value Target" style={{ minWidth: '12rem' }}></Column>
                <Column field="base_Value" header="Base Value" filter filterPlaceholder="Search by Base Value" style={{ minWidth: '12rem' }}></Column>
                <Column field="notes" header="Notes" filter filterPlaceholder="Search by Notes" style={{ minWidth: '12rem' }}></Column>
                <Column field="sources_and_Further_Reading" header="Sources and Further Reading" filter filterPlaceholder="Search by Sources and Further Reading" style={{ minWidth: '12rem' }}></Column>
                <Column field="selected_indicator" header="Selected Indicator" filter filterPlaceholder="Search by Selected Indicator" style={{ minWidth: '12rem' }}></Column>
                <Column field="adaptation_Needs" header="Adaptation Needs" filter filterPlaceholder="Search by Adaptation Needs" style={{ minWidth: '12rem' }}></Column>
                <Column field="piloting" header="Piloting" filter filterPlaceholder="Search by Piloting" style={{ minWidth: '12rem' }}></Column>
                <Column field="opinion_from_ODIPY_Other_experts" header="Expert Opinion" filter filterPlaceholder="Search by Expert Opinion" style={{ minWidth: '12rem' }}></Column>
                <Column field="pilot_outcome" header="Pilot Outcome" filter filterPlaceholder="Search by Pilot Outcome" style={{ minWidth: '12rem' }}></Column>
                <Column field="pilot_success_criteria" header="Pilot Success Criteria" filter filterPlaceholder="Search by Success Criteria" style={{ minWidth: '12rem' }}></Column>
                            

             
                <Column header="Ενέργειες" field="id" body={ActionsBodyTemplate} alignFrozen="right" frozen headerStyle={{ backgroundImage: 'linear-gradient(to right, #1400B9, #00B4D8)', color: '#ffffff' }}/>

 </DataTable>

    {/* Dialog for editing Paradotea */}
    

        
       
    </div>
    )
}

export default IndicatorsList;
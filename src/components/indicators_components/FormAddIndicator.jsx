import React,{useState, useEffect,useMemo } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import apiBaseUrl from '../../apiConfig'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { Divider } from 'primereact/divider';
import { format } from 'date-fns';



const FormAddIndicator = () => {
    const [id, setId] = useState(null);
    const [indicator_name, setIndicator_Name] = useState("");
    const [q4all_Ind_number, setQ4All_Ind_Number] = useState("");
    const [status, setStatus] = useState("");
    const [indicator_cluster, setIndicator_Cluster] = useState("");
    const [ind_Merge, setInd_Merge] = useState("");
    const [catergory_of_Indicator, setCatergory_Of_Indicator] = useState("");
    const [dimension, setDimension] = useState("");
    const [type_of_healthcare, setType_Of_Healthcare] = useState("");
    const [type_of_healthcare_providers_D1_D7, setType_Of_Healthcare_Providers_D1_D7] = useState("");
    const [cross_Cutting_Dimensions_A_I, setCross_Cutting_Dimensions_A_I] = useState("");
    const [cross_Cutting_Dimensions_Inputs_Process_Outputs, setCross_Cutting_Dimensions_Inputs_Process_Outputs] = useState("");
    const [dimensions_of_Quality_QoCOfficeReport, setDimensions_Of_Quality_QoCOfficeReport] = useState("");
    const [priority, setPriority] = useState("");
    const [data_collection, setData_Collection] = useState("");
    const [collecting_National_Organization, setCollecting_National_Organization] = useState("");
    const [legal_Organizational_Requirements, setLegal_Organizational_Requirements] = useState("");
    const [proponent_Organization_WG, setProponent_Organization_WG] = useState("");
    const [rationale_Description, setRationale_Description] = useState("");
    const [objective, setObjective] = useState("");
    const [calculation_Formula, setCalculation_Formula] = useState("");
    const [numerator, setNumerator] = useState("");
    const [numerator_Definitions, setNumerator_Definitions] = useState("");
    const [denominator, setDenominator] = useState("");
    const [denominator_Definitions, setDenominator_Definitions] = useState("");
    const [target_Population, setTarget_Population] = useState("");
    const [field_Topic, setField_Topic] = useState("");
    const [extraCol2, setExtraCol2] = useState("");
    const [periodicity, setPeriodicity] = useState("");
    const [data_Collection_Steps, setData_Collection_Steps] = useState("");
    const [legal_Requirements, setLegal_Requirements] = useState("");
    const [responsible_for_Monitoring, setResponsible_For_Monitoring] = useState("");
    const [deadline_Reporting, setDeadline_Reporting] = useState("");
    const [supervisor_Body, setSupervisor_Body] = useState("");
    const [management_Entity, setManagement_Entity] = useState("");
    const [applicable_period, setApplicable_Period] = useState("");
    const [unit_of_Measurement, setUnit_Of_Measurement] = useState("");
    const [data_Source_Monitoring_Basis, setData_Source_Monitoring_Basis] = useState("");
    const [it_System_Source, setIt_System_Source] = useState("");
    const [reference_Value_Target, setReference_Value_Target] = useState("");
    const [base_Value, setBase_Value] = useState("");
    const [notes, setNotes] = useState("");
    const [sources_and_Further_Reading, setSources_And_Further_Reading] = useState("");
    const [selected_indicator, setSelected_Indicator] = useState("");
    const [adaptation_Needs, setAdaptation_Needs] = useState("");
    const [piloting, setPiloting] = useState("");
    const [opinion_from_ODIPY_Other_experts, setOpinion_From_ODIPY_Other_Experts] = useState("");
    const [pilot_outcome, setPilot_Outcome] = useState("");
    const [pilot_success_criteria, setPilot_Success_Criteria] = useState("");



    

    const[msg,setMsg]=useState("");

    const navigate = useNavigate();

    useEffect(() => {
    }, []);

    


 

   

    const saveIndicator = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/indicator`, {
                id: id,
                indicator_name: indicator_name,
                q4all_Ind_number: q4all_Ind_number,
                status: status,
                indicator_cluster: indicator_cluster,
                ind_Merge: ind_Merge,
                catergory_of_Indicator: catergory_of_Indicator,
                dimension: dimension,
                type_of_healthcare: type_of_healthcare,
                type_of_healthcare_providers_D1_D7: type_of_healthcare_providers_D1_D7,
                cross_Cutting_Dimensions_A_I: cross_Cutting_Dimensions_A_I,
                cross_Cutting_Dimensions_Inputs_Process_Outputs: cross_Cutting_Dimensions_Inputs_Process_Outputs,
                dimensions_of_Quality_QoCOfficeReport: dimensions_of_Quality_QoCOfficeReport,
                priority: priority,
                data_collection: data_collection,
                collecting_National_Organization: collecting_National_Organization,
                legal_Organizational_Requirements: legal_Organizational_Requirements,
                proponent_Organization_WG: proponent_Organization_WG,
                rationale_Description: rationale_Description,
                objective: objective,
                calculation_Formula: calculation_Formula,
                numerator: numerator,
                numerator_Definitions: numerator_Definitions,
                denominator: denominator,
                denominator_Definitions: denominator_Definitions,
                target_Population: target_Population,
                field_Topic: field_Topic,
                extraCol2: extraCol2,
                periodicity: periodicity,
                data_Collection_Steps: data_Collection_Steps,
                legal_Requirements: legal_Requirements,
                responsible_for_Monitoring: responsible_for_Monitoring,
                deadline_Reporting: deadline_Reporting,
                supervisor_Body: supervisor_Body,
                management_Entity: management_Entity,
                applicable_period: applicable_period,
                unit_of_Measurement: unit_of_Measurement,
                data_Source_Monitoring_Basis: data_Source_Monitoring_Basis,
                it_System_Source: it_System_Source,
                reference_Value_Target: reference_Value_Target,
                base_Value: base_Value,
                notes: notes,
                sources_and_Further_Reading: sources_and_Further_Reading,
                selected_indicator: selected_indicator,
                adaptation_Needs: adaptation_Needs,
                piloting: piloting,
                opinion_from_ODIPY_Other_experts: opinion_from_ODIPY_Other_experts,
                pilot_outcome: pilot_outcome,
                pilot_success_criteria: pilot_success_criteria
            });
    
            navigate("/"); // Redirect to a different page after saving
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg); // Capture and display error messages
            }
        }
    };

    // const clearDate = (e) => {
    //     e.preventDefault();  // Prevent form submission
    //     setEstimate_Payment_Date_2(null); // Clear the calendar date
    // };

    // const clearDate2 = (e) => {
    //     e.preventDefault();  // Prevent form submission
    //     setEstimate_Payment_Date_3(null); // Clear the calendar date
    // }


    return (
            <div>
              <h1 className='title'>Add Indicator Form</h1>
              <form onSubmit={saveIndicator}>
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <div className="card p-fluid">
                      <div className=""><Divider><span className="p-tag text-lg">Indicator</span></Divider></div>
                      <div className="field">
                        <label htmlFor="indicator_name">Indicator Name</label>
                        <div className="control">
                          <InputText id="indicator_name" type="text" value={indicator_name} onChange={(e) => setIndicator_Name(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="q4all_Ind_number">Q4ALL Indicator Number</label>
                        <div className="control">
                          <InputText id="q4all_Ind_number" type="text" value={q4all_Ind_number} onChange={(e) => setQ4All_Ind_Number(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="status">Status</label>
                        <div className="control">
                          <InputText id="status" type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="indicator_cluster">Indicator Cluster</label>
                        <div className="control">
                          <InputText id="indicator_cluster" type="text" value={indicator_cluster} onChange={(e) => setIndicator_Cluster(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="ind_Merge">Indicator Merge</label>
                        <div className="control">
                          <InputText id="ind_Merge" type="text" value={ind_Merge} onChange={(e) => setInd_Merge(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="catergory_of_Indicator">Category of Indicator</label>
                        <div className="control">
                          <InputText id="catergory_of_Indicator" type="text" value={catergory_of_Indicator} onChange={(e) => setCatergory_Of_Indicator(e.target.value)} />
                        </div>
                      </div>
                      <div className="field">
                        <label htmlFor="dimension">Dimension</label>
                        <div className="control">
                          <InputText id="dimension" type="text" value={dimension} onChange={(e) => setDimension(e.target.value)} />
                        </div>
                      </div>
                      {/* More fields go here, following the same pattern */}
                    </div>
                    <div className="field">
                      <div className="control">
                        <Button type="submit" label="Save Indicator" className="p-button-success is-fullwidth" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          
      
      )

}

export default FormAddIndicator
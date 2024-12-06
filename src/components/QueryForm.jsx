import React, { useState } from 'react'
import { apiRepository } from '../mocks/apiRepo';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3004';

function QueryForm( {handleAddQuery, onCancel}) {
    const [queryName, setQueryName] = useState("");
    const [interval, setApiInterval] = useState(5);
    const [selectedApi, setSelectedApi] = useState(apiRepository[0]);
    const [selectedParameter, setSelectedParameter] = useState("");
    const [parameterValue, setParameterValue] = useState("");
    const [responseAttr, setResponseAttr] = useState("");

    const handleInputChange = (event) =>{
        event.preventDefault();
        const { name, value} = event.target;
        if(name === 'queryName'){
            setQueryName(value);
        }
        if(name === 'interval'){
            setApiInterval(value);
        }
        if(name === 'parameterValue'){
            setParameterValue(value);
        }
    }

    const handleApi = (event) => {
        event.preventDefault();
        const endPoint = event.target.value;
        const api = apiRepository.find((api) => api.endpoint.url === endPoint);
        setSelectedApi(api);
    }

    const handleQueryParameter = (event) => {
        event.preventDefault();
        const parameter = event.target.value;
        setSelectedParameter(parameter);
    }

    const handleResponse = (event) => {
        event.preventDefault();
        const response = event.target.value;
        setResponseAttr(response);
    }

    const handleSave =  async (event) => {
        event.preventDefault();
        const newQuery = {
            name: queryName,
            interval: interval,
            endpoint: selectedApi.endpoint.url,
            param: selectedParameter,
            paramValue: parameterValue,
            responseAttr: responseAttr 
        }
        const response = await axios.post('/api/queries', newQuery);
        console.log(response.data);
        //handleAddQuery(newQuery);
        console.log("Saving query", newQuery);
        // resetting the value after save
        setQueryName('');
        setApiInterval(5);
        setSelectedApi(apiRepository[0]);
        setSelectedParameter('');
        setParameterValue('');
        setResponseAttr('');
    }


    
    const handleCancel = () => {
        setQueryName('');
        setApiInterval(5);
        setSelectedApi(apiRepository[0]);
        setSelectedParameter('');
        setParameterValue('');
        setResponseAttr('');
        onCancel();
    }
    
  return (
    <div>
      <h3>Add query</h3>
      <form onSubmit={handleSave}>
        <div>
          <input
            type="text"
            id="queryName"
            name="queryName"
            required
            value={queryName}
            onChange={handleInputChange}
            placeholder='Enter Query Name'
          />
        </div>
        <div>
          <input
            type="number"
            id="interval"
            name="interval"
            required
            value={interval}
            onChange={handleInputChange}
            placeholder='Choose Interval'
          />
        </div>
        <div>
          <select id="api" name="api" onChange={handleApi}>
          <option value="" disabled>Choose API</option>
            {apiRepository.map((api) => (
              <option key={api.endpoint.url} value={api.endpoint.url}>
                {api.endpoint.url}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select id="parameter" name="parameter" value={selectedParameter} onChange={handleQueryParameter}>
            <option value="" disabled>Choose query parameter of API</option>
            {selectedApi && selectedApi.endpoint.params.map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
          </select>
          <input
            type="text"
            id="parameterValue"
            name="parameterValue"
            value={parameterValue}
            onChange={handleInputChange}
            placeholder='Enter Parameter Value'
          />
        </div>
        <div>
          <select id="response" name="response" value={responseAttr} onChange={handleResponse}>
            <option value="" disabled>Choose Response Attribute</option>
            {selectedApi && selectedApi.endpoint.response.map((response) => (
            <option key={response} value={response}>
              {response}
            </option>
          ))}
          </select>
        </div>
        <div> 
          <button type="submit" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default QueryForm;

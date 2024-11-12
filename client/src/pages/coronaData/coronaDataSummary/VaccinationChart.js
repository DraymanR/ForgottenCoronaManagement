import React, { useState, useEffect } from 'react';
import MyLineChart from './lineChart';
import coronaDataService from '../../../services/coronaData.service';

const VaccinationChart = () => {
  const [startDate, setStartDate] = useState(new Date('2021-01-01'));
  const [endDate, setEndDate] = useState(new Date());
  const [vaccinatedPatients, setvaccinatedPatients] = useState([])

  function getDatesArray(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate)); // Add the current date to the array
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dates;
  }


  const getVaccinatedPatients = async () => {
    try {
      const dateArray = getDatesArray(startDate, endDate)
      const rawData = await coronaDataService.getVaccinatedMembers();
      const data = dateArray.map(date => {
        const dateString = date.toISOString().split('T')[0];
        return {
          date: dateString,
          value: rawData[dateString] || 0
        };
      });
      setvaccinatedPatients(data)
    } catch (error) {
      console.error('Error fetching corona data by member ID:', error);
      throw error;
    }
  }
  
  useEffect(() => {
    getVaccinatedPatients();
  }, [startDate, endDate]);


  return (
    <div>
      <div>
        <label>תאריך התחלה:</label>
        <input type="date" value={startDate.toISOString().split('T')[0]} onChange={(e) => setStartDate(new Date(e.target.value))} />
      </div>
      <div>
        <label>תאריך סיום:</label>
        <input type="date" value={endDate.toISOString().split('T')[0]} onChange={(e) => setEndDate(new Date(e.target.value))} />
      </div>
      < MyLineChart data={vaccinatedPatients} />

    </div>
  );
}

export default VaccinationChart;

import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUniversities } from '../redux/universitiesSlice';
import { AppDispatch, RootState } from '../redux/store';
import UniversityCard from './UniversityCard';
import { University } from '../types/types';

const universityNames = [
  "İstanbul University",
  "Hacettepe University",
  "Ankara University",
  "Boğaziçi University",
  "Middle East Technical University",
  "Ege University",
  "İzmir Institute of Technology",
  "Koç University",
  "Sabancı University",
  "Bilkent University",
  "Yıldız Technical University",
  "Marmara University",
  "Dokuz Eylül University",
  "Gazi University",
  "Çukurova University",
  "Uludağ University",
  "Atatürk University",
  "Karadeniz Technical University",
  "Akdeniz University",
  "Erciyes University"
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Universities() {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
    dispatch(fetchUniversities());
  }, []);
    
    // const universities = useSelector((state: RootState) => state.universities.universities);
    // const universities: University[] = [{
    //     uni_id: 102,
    //     uni_name: "İstanbul University",
    //     il_id: 34,
    //     status: 1
    //   },
    //   {
    //     uni_id: 103,
    //     uni_name: "Hacettepe University",
    //     il_id: 44,
    //     status: 1
    //   }];

    const universities:University[]= universityNames.map((name, index) => ({
      uni_id: 100 + index,
      uni_name: name,
      il_id: getRandomInt(1, 81),
      status: 1,
    })); 

        
      const filteredUniversities = universities.filter(university =>
        university.uni_name.toLowerCase().includes(searchTerm.toLowerCase())
      );


  return (
    <main className="main">
      <div className="main__content">
        <h1 className="main__title">Universities</h1>
        <input
          type="text"
          id="search"
          className="search__input"
          placeholder="Search for a university..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="universities" id="university-list">
        {filteredUniversities.map((uni: University) => (
            <UniversityCard key={uni.uni_id} uniInfo={uni}/>
        ))}
          
        </div>
      </div>
    </main>
  )
}

export default Universities
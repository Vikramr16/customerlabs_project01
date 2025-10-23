import React, { useState, useCallback, useMemo } from 'react';
import './App.css';
import SegmentModal from './SegmentModal';

const ALL_SCHEMAS = [
  { label: 'First Name', value: 'first_name', color: '#4CAF50' },
  { label: 'Last Name', value: 'last_name', color: '#4CAF50' },
  { label: 'Gender', value: 'gender', color: '#F44336' },
  { label: 'Age', value: 'age', color: '#4CAF50' },
  { label: 'Account Name', value: 'account_name', color: '#F44336' },
  { label: 'City', value: 'city', color: '#F44336' },
  { label: 'State', value: 'state', color: '#4CAF50' },
];

//const WEBHOOK_URL = 'https://webhook.site/70e876b6-8dc1-42bf-811f-c813c9d17198';
//const WEBHOOK_URL = 'https://cors-anywhere.herokuapp.com/https://webhook.site/70e876b6-8dc1-42bf-811f-c813c9d17198';
const WEBHOOK_URL = 'http://localhost:4000/send-segment';

const buildPayload = (segmentName, addedSchemas) => {
  const schema = addedSchemas.map(a => {
    const opt = ALL_SCHEMAS.find(o => o.value === a.value);
    return { [a.value]: opt ? opt.label : a.value };
  });
  return {
    segment_name: segmentName || 'unnamed_segment',
    schema
  };
};

const App = () => {
  const [show, setShow] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [mainSelect, setMainSelect] = useState('');
  const [addedSchemas, setAddedSchemas] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const availableOptions = useCallback(() => {
    const selectedValues = addedSchemas.map(a => a.value).filter(Boolean);
    return ALL_SCHEMAS.filter(o => !selectedValues.includes(o.value));
  }, [addedSchemas]);

  const availableMainOptions = useMemo(() => availableOptions(), [availableOptions]);

  const addSchema = () => {
    if (!mainSelect) return;
    setAddedSchemas(prev => [...prev, { id: Date.now(), value: mainSelect }]);
    setMainSelect('');
  };

  const changeAdded = (id, newValue) => {
    setAddedSchemas(prev => prev.map(a => a.id === id ? { ...a, value: newValue } : a));
  };

  const removeAdded = (id) => {
    setAddedSchemas(prev => prev.filter(a => a.id !== id));
    setMainSelect('');
  };

  const saveSegment = async () => {
    if (!segmentName.trim()) {
      alert('Segment Name cannot be empty.');
      return;
    }
    if (addedSchemas.length === 0) {
      alert('Please add at least one schema to save the segment.');
      return;
    }

    setIsSaving(true);
    const payload = buildPayload(segmentName, addedSchemas);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setIsSaving(false);

      if (res.ok) {
        alert(`Segment saved. Status: ${res.status}`);
        setShow(false);
        setSegmentName('');
        setAddedSchemas([]);
        setMainSelect('');
      } else {
        alert(`Failed. Status: ${res.status}`);
      }
    } catch (e) {
      setIsSaving(false);
      alert('Error: ' + e.message);
    }
  };

  return (
    <div className="app-container">
      <div className="main-header">
        <h1 className="main-title">&lt; View Audience</h1>
        <button onClick={() => setShow(true)} className="main-save-btn">
          Save segment
        </button>
      </div>

      {show && (
        <SegmentModal
          segmentName={segmentName}
          setSegmentName={setSegmentName}
          mainSelect={mainSelect}
          setMainSelect={setMainSelect}
          addedSchemas={addedSchemas}
          setAddedSchemas={setAddedSchemas}
          changeAdded={changeAdded}
          removeAdded={removeAdded}
          addSchema={addSchema}
          availableMainOptions={availableMainOptions}
          isSaving={isSaving}
          saveSegment={saveSegment}
          setShow={setShow}
        />
      )}
    </div>
  );
};

export default App;
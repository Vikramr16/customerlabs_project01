import React from 'react';

const ALL_SCHEMAS = [
    { label: 'First Name', value: 'first_name', color: '#4CAF50' },
    { label: 'Last Name', value: 'last_name', color: '#4CAF50' },
    { label: 'Gender', value: 'gender', color: '#F44336' },
    { label: 'Age', value: 'age', color: '#4CAF50' },
    { label: 'Account Name', value: 'account_name', color: '#F44336' },
    { label: 'City', value: 'city', color: '#F44336' },
    { label: 'State', value: 'state', color: '#4CAF50' },
];

const SegmentModal = ({
    segmentName, setSegmentName,
    mainSelect, setMainSelect,
    addedSchemas,
    changeAdded, removeAdded,
    addSchema,
    availableMainOptions,
    isSaving, saveSegment, setShow
}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    &lt; Saving Segment
                </div>

                <div className="modal-body">
                    <div className="input-group">
                        <label className="input-label">Enter the Name of the Segment</label>
                        <input
                            type="text"
                            value={segmentName}
                            onChange={e => setSegmentName(e.target.value)}
                            placeholder="Name of the segment"
                            className="text-input"
                        />
                    </div>

                    <p className="query-info">
                        To save your segment, you need to add the schemas to build the query
                        <br />
                        <span className="trait-labels">
                            <span className="user-trait">• User Traits</span>
                            <span className="group-trait">• Group Traits</span>
                        </span>
                    </p>

                    <div className="schema-box">
                        {addedSchemas.length === 0 && (
                            <div className="no-schema-message">
                                No schema added yet
                            </div>
                        )}

                        {addedSchemas.map((a) => {
                            const otherSelected = addedSchemas.filter(x => x.id !== a.id).map(x => x.value);
                            const opts = ALL_SCHEMAS.filter(o => !otherSelected.includes(o.value));
                            const currentSchema = ALL_SCHEMAS.find(o => o.value === a.value) || {};

                            return (
                                <div key={a.id} className="schema-row">
                                    <span
                                        className="trait-dot"
                                        style={{ backgroundColor: currentSchema.color || 'gray' }}
                                    ></span>

                                    <select
                                        value={a.value}
                                        onChange={e => changeAdded(a.id, e.target.value)}
                                        className="schema-select"
                                    >
                                        {opts.map(o => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => removeAdded(a.id)}
                                        className="remove-btn"
                                        title="Remove schema"
                                    >
                                        -
                                    </button>
                                </div>
                            );
                        })}

                        <div className="schema-row add-select-row">
                            <select
                                value={mainSelect}
                                onChange={e => setMainSelect(e.target.value)}
                                className="schema-select add-schema-select"
                            >
                                <option value="" disabled>Add schema to segment</option>
                                {availableMainOptions.map(o => (
                                    <option key={o.value} value={o.value}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); addSchema(); }}
                            className="add-link"
                        >
                            + Add new schema
                        </a>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={saveSegment}
                        disabled={isSaving}
                        className={`save-btn ${isSaving ? 'disabled-btn' : ''}`}
                    >
                        {isSaving ? 'Saving...' : 'Save the Segment'}
                    </button>
                    <button
                        onClick={() => setShow(false)}
                        disabled={isSaving}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SegmentModal;

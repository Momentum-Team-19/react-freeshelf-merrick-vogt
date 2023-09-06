const ViewToggle = ({ view, setView }) => {
    return (
      <div className="d-flex justify-content-end">
        <button 
          className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setView('list')}
        >
          List View
        </button>
        <button 
          className={`btn ${view === 'grid' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setView('grid')}
        >
          Grid View
        </button>
      </div>
    );
};

export default ViewToggle;

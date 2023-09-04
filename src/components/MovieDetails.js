export const MovieDetails = ({selectedId, onCloseSelectedMovie}) => {
  return (
    <div className="details">
      <button onClick={onCloseSelectedMovie} className="btn-back">&larr;</button>
      {selectedId}
    </div>
  );
};
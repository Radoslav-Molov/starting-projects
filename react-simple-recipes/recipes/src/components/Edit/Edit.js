import React from "react";
import CreateForm from "../CreateForm/CreateForm";

function Edit({ changeCurrentPath }) {
  return (
    <div>
      <CreateForm changeCurrentPath={changeCurrentPath} isEditMode={true} />
    </div>
  );
}

export default Edit;

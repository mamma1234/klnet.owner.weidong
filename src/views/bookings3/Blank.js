import React, { useEffect } from 'react';

import queryString from "query-string";

const Blank = props => {

    useEffect(()=>{
        console.log("----------------------------------");
        // console.log("props", props);
        // console.log("props", queryString.parse(props.location.search));
        const params = queryString.parse(props.location.search);
        // let form = document.reportForm;
        // form.action = 'http://localhost:5000/api/reportViewer';
        // form.target = params.system_id; // window.open() 의 두번째 변수와 동일해야.
        // form.file_id.value = params.file_id;
        // form.file_path.value = params.file_path;
        // form.name.value = params.name;
        // form.parameters.value = params.parameters;
        // window.location.href = form.submit();

        window.location.href="http://localhost:5000/api/reportViewer?file_id="+params.file_id
        +'&system_id='+params.system_id
        +'&user_id='+params.user_id
        +'&file_type='+params.file_type
        +'&file_path='+params.file_path
        +'&name='+params.name
        +'&connection='+params.connection
        +'&parameters='+params.parameters
    },[props])
    
    return (
        <div>
            <form id="reportForm" name="reportForm" method="post">
                <input type="hidden" name="system_id"   value="plismplus" />
                <input type="hidden" name="user_id"     value="M000008" />
                <input type="hidden" name="file_type"   value="pdf" />
                <input type="hidden" name="file_id"     value="" />
                <input type="hidden" name="file_path"   value="" />
                <input type="hidden" name="name"        value="" />
                <input type="hidden" name="connection"  value="pgsql" />
                <input type="hidden" name="parameters" id="parameters"/>
            </form>
        </div>
      );
}

export default Blank;
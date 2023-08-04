

export const delayAsync = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

export const getThaiDateFormatted = (date) => {
    var dateThaiOption = {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };

    var formatter = new Intl.DateTimeFormat("en-US", dateThaiOption);
    var formattedDate = formatter.format(date).replaceAll("/", "-");
    var parts = formattedDate.split("-");
    formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    return formattedDate;
}

export const empty = (val) => {
    if (val && typeof val === 'object' && Array.isArray(val)) {
        if (val.length === 0) {
            // console.log('array', val)
            return true;
        }

    } else if (val && typeof val === 'object' && !(val instanceof Date)) {
        if (Object.keys(val).length === 0) {
            // console.log('dict', Object.keys(val))
            return true;
        }

    }
    if (val === undefined || val === null || `${val}`.trim() === '') {
        // console.log('any', val)
        return true;
    }

    return false;
}

export const emptyValue = (val) => empty(val)
export const onInputChange = (event, data, setData) => {
    data[event.target.name] = event.target.value;
    setData({ ...data })
    console.log(data)
}

export const onInputToggleChange = (event, data, setData) => {
    data[event.target.name] = event.target.checked;
    setData({ ...data })
    // console.log(event.target.name, data[event.target.name])
    console.log(data)
}
export function getFormTypeConfigKey(form) {
    let formType = "form_001";

    if (form.form_type === "FM-SER-001") {
        formType = "form_001";
    }
    return formType;
}

export const onSelectSearchOptions = (input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())



export function getInspectionTypeOfHoist(ins) {
    return ins?.type_of_hoist_air_hoist
        ? "Air Hoist"
        : ins?.type_of_hoist_chain_hoist
            ? "Chain Hoist"
            : ins?.type_of_hoist_exproof
                ? "Exproof"
                : ins?.type_of_hoist_hydraulic
                    ? "Hydraulic"
                    : ins?.type_of_hoist_manual
                        ? "Manual"
                        : ins?.type_of_hoist_other
                            ? "Other"
                            : ins?.type_of_hoist_plc
                                ? "Plc"
                                : ins?.type_of_hoist_winch
                                    ? "Winch"
                                    : ins?.type_of_hoist_wire_rope
                                        ? "Wire Rope"
                                        : "-";
}

export function getInspectionTypeOfCrane(ins) {
    return ins?.type_of_crane_d_g
        ? "D G"
        : ins?.type_of_crane_fixed
            ? "Fixed"
            : ins?.type_of_crane_gantry
                ? "Gantry"
                : ins?.type_of_crane_goods_lift
                    ? "Goods Lift"
                    : ins?.type_of_crane_jib_crane
                        ? "Jib Crane"
                        : ins?.type_of_crane_monorial
                            ? "Monorial"
                            : ins?.type_of_crane_other
                                ? "Other"
                                : ins?.type_of_crane_s_g
                                    ? "S G"
                                    : ins?.type_of_crane_semi_gantry
                                        ? "Semi Gantry"
                                        : "-";
}

import React, {useState, useEffect}from 'react';

import {Input,FormFeedback, InputGroup, InputGroupText, InputGroupAddon, Alert} from 'reactstrap';
import * as validation from 'components/common/validation.js';
import moment from 'moment';

export default function InputValid (props) {
/**
 * <InputValid 
    type="text"
    name="cntr_qty"
    id="cntr_qty"
    bsSize={("MAIN"===openType)?'sm':null}
    placeholder=""
    onChange={(e)=>fncOnChange(e, 'cntr_qty')}
    onBlur={(e) => {fncOnBlur(e)}}
    maxLength="4" --> 필수
    value={container.cntr_qty?container.cntr_qty:''} --> 필수
    validtype="text" --> (email, tel) 필수 형식 체크(custom prperty)
    required={'CARD'===openType||'MAIN'===openType?true:false}  --> 필수입력은 true 아닌경우 false(길이만 체크)(custom prperty)
    feedid="container" --> 필수 validtation 실행 시 open할 Card 정보
    inputgrouptext --> 선택 kg, CBM 등 단위 표시
/>


SEND 시 필수 및 길이 validtiaon 체크
validation.fncValidation();
validation.fncFeedIdInvalidMaxLength('booking');

SAVE 시 길이만 validation 체크
validation.fncValidationMaxLength(); 
validation.fncFeedIdInvalidMaxLength('booking');

 */
    const {
        value,
        required,
        validtype,
        maxLength,
        feedid,
        inputgrouptext,
        bsSize,
        disable,
        minLength
    } = props;

    const [pasteCheck, setPasteCheck] = useState(false);
    const [AlertMsg, setAlertMsg] = useState("");
    useEffect(()=>{
        if( pasteCheck ) {
            setTimeout(function(){
                setPasteCheck(false);
            }, 2000)
        }
    },[pasteCheck])

    /**
     * 필수
     * value, maxLength 값은 입력이 필요함.
     * required = true:false 필수여부
     * validtype = text(일반텍스트) email(이메일) tel(전화번호)
     */
    let msgLength = "";
    if( maxLength ) {
        msgLength = " ("+maxLength+"/"+ validation.getByteB(value)+")";
    } else {
        msgLength = "";
    }
    const fncValidation =()=> {

        // console.log( "validtype",validtype )
        
        
        // 1. 필수 부터 확인
        if( required ) {
            // 1.1 필수 인 경우
            if( value.trim() ) {
                // 2. Check validtype
                if( 'text' === validtype ) {
                    if(validation.EDICharsetCheck(value)) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                        
                    }else {
                        return true;
                    }
                } else if ( 'email' === validtype ) {
                    if( validation.validEmail(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'tel' === validtype ) {
                    if( validation.validTel(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'engNumber' === validtype ) {
                    if( validation.validEngNumber(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'number' === validtype ) {
                    if( validation.validNumber(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'english' === validtype ) {
                    if( validation.validEnglish(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmdd' === validtype ) {
                    if( value.length === 8 ) {
                        let dateTime = moment(value,'YYYYMMDD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 10 ) {
                        let dateTime = moment(value,'YYYY-MM-DD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmddhhmm' === validtype ) {
                    if( value.length === 12 ) {
                        let dateTime = moment(value,'YYYYMMDDHHmm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 16 ) {
                        let dateTime = moment(value,'YYYY-MM-DD HH:mm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                return true;
            }
        } else {
            // 1.1 필수가 아닌 경우
            if( value.trim() ) {
                if( 'text' === validtype ) {
                    if(validation.EDICharsetCheck(value)) { 
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    }else {
                        return true;
                    }
                } else if ( 'email' === validtype ) {
                    if( validation.validEmail(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'tel' === validtype ) {
                    if( validation.validTel(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'engNumber' === validtype ) {
                    if( validation.validEngNumber(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'number' === validtype ) {
                    if( validation.validNumber(value) ) {
                        if ( minLength ) {
                            if(validation.validMinLength(value, minLength)) {
                                return true;
                            }else {
                                if( maxLength ) {
                                    return validation.validMaxLength(value, maxLength);
                                } else {
                                    return false;
                                }
                            }
                        }else {
                            if( maxLength ) {
                                return validation.validMaxLength(value, maxLength);
                            } else {
                                return false;
                            }
                        }
                    } else {
                        return true;
                    }
                } else if ( 'english' === validtype ) {
                    if( validation.validEnglish(value) ) {
                        if( maxLength ) {
                            return validation.validMaxLength(value, maxLength);
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmdd' === validtype ) {
                    if( value.length === 8 ) {
                        let dateTime = moment(value,'YYYYMMDD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    }  else if( value.length === 10 ) {
                        let dateTime = moment(value,'YYYY-MM-DD');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                } else if ( 'yyyymmddhhmm' === validtype ) {
                    if( value.length === 12 ) {
                        let dateTime = moment(value,'YYYYMMDDHHmm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if( value.length === 16 ) {
                        let dateTime = moment(value,'YYYY-MM-DD HH:mm');
                        if( dateTime.isValid() ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else {
                // 필수가 아닌 경우 false
                return false;
            }
        }
    }

    const fncPasteCheck =(e)=>{
        let cpData = e.clipboardData.getData('Text');
        if( cpData ) {
            if( validation.validMaxLength(cpData, maxLength) ) {
                // console.log("선넘네... ", cpData.length, maxLength);
                setAlertMsg('복사값이 커서 붙여넣기가 정상적으로 이루어 지지 않았습니다.')
                setPasteCheck(true)
            } else {
                // console.log("pass... ", cpData.length, maxLength)
                // setPasteCheck(false)
            }
            // setPasteCheck(false)
        }
    }

    return (
        <>
        {inputgrouptext?
            <InputGroup>
                <Input
                    {...props}
                    // onChange={(value) => {onTextChange(value)}}
                    value={value}
                    invalid={fncValidation()}
                    onPaste={(e)=>{fncPasteCheck(e)}}
                >
                </Input>
                <InputGroupAddon addonType="append"> 
                    <InputGroupText className={bsSize==='sm'?"pb-1":""}>{inputgrouptext}</InputGroupText> 
                </InputGroupAddon>
                
                <FormFeedback
                    feedid={feedid}
                >{
                    !validation.EDICharsetCheck(value)? validation.EDICheckText(value): 
                    required? validation.REQ_MSG+(
                        validation.validMinLength(value, minLength)?validation.MIN_ERROR_MSG(minLength):
                        'text' === validtype ?  validation.LEN_MSG+msgLength:
                        'email' === validtype ? validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ? validation.TEL_MSG+msgLength :
                        'number' === validtype ? validation.NUM_MSG+msgLength :
                        'engNumber' === validtype ? validation.ENG_NUM_MSG+msgLength :
                        'english' === validtype ? validation.ENG_MSG+msgLength :
                        // 'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                        )
                    :
                    ( validation.validMinLength(value, minLength)?validation.MIN_ERROR_MSG(minLength):
                        'text' === validtype ? validation.LEN_MSG+msgLength:
                        'email' === validtype ? validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ? validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'engNumber' === validtype ? validation.ENG_NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength :
                        // 'validtype' === validtype ? validation.REQ_MSG :
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ?  validation.YYYYMMDDHHMM_MSG :'' 
                    )
                }</FormFeedback>
            </InputGroup>
        :
            <>
                <Input
                    {...props}
                    // onChange={(value) => {onTextChange(value)}}
                    value={value}
                    invalid={fncValidation()}
                    disabled={disable?disable:false}
                    onPaste={(e)=>{fncPasteCheck(e)}}>
                </Input>
                <FormFeedback
                    feedid={feedid}
                >{
                    !validation.EDICharsetCheck(value)? validation.EDICheckText(value): required?
                        validation.REQ_MSG+(
                        validation.validMinLength(value, minLength)?validation.MIN_ERROR_MSG(minLength):
                        'text' === validtype ?  validation.LEN_MSG+msgLength:
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength :
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                        'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                        )
                    :
                        validation.validMinLength(value, minLength)?validation.MIN_ERROR_MSG(minLength):
                        'text' === validtype ? validation.LEN_MSG+msgLength :
                        'email' === validtype ?  validation.EMAIL_MSG+msgLength :
                        'tel' === validtype ?  validation.TEL_MSG+msgLength :
                        'number' === validtype ?  validation.NUM_MSG+msgLength :
                        'english' === validtype ?  validation.ENG_MSG+msgLength:
                        'engNumber' === validtype ?  validation.ENG_NUM_MSG+msgLength : 
                        'validtype' === validtype ? validation.REQ_MSG : 
                        'yyyymmdd' === validtype ? validation.YYYYMMDD_MSG : 
                        'yyyymmddhhmm' === validtype ? validation.YYYYMMDDHHMM_MSG :'' 
                }</FormFeedback>
                
            </>}
            <Alert isOpen={pasteCheck} color="danger" fade={true}>{AlertMsg}</Alert>
        </>
    )
}
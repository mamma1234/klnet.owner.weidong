import React,{useEffect} from "react";
import {

    Card, CardTitle, Col
    // UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
// reactstrap components core components
import WeidongNavbar from "components/Navbars/WeidongNavbar.js";
import FooterWeidong from "components/Footers/FooterWeidong.js";
// sections for this page

function Sitemap(props) {
    document
        .documentElement
        .classList
        .remove("nav-open");
    useEffect(() => {
        props.fncClickMenu('사이트맵')
        
    },[]);
    // function that is being called on scroll of the page
    const checkScroll = () => {
        // it takes all the elements that have the .add-animation class on them
        const componentPosition = document.getElementsByClassName("add-animation");
        const scrollPosition = window.pageYOffset;
        for (var i = 0; i < componentPosition.length; i++) {
            var rec = componentPosition[i]
                .getBoundingClientRect()
                .top + window.scrollY + 100;
            // when the element with the .add-animation is in the scroll view, the .animated
            // class gets added to it, so it creates a nice fade in animation
            if (scrollPosition + window.innerHeight >= rec) {
                componentPosition[i]
                    .classList
                    .add("animated");
                // when the element with the .add-animation is not in the scroll view, the
                // .animated class gets removed from it, so it creates a nice fade out animation
            } else if (scrollPosition + window.innerHeight * 0.8 < rec) {
                componentPosition[i]
                    .classList
                    .remove("animated");
            }
        }
    };

    React.useEffect(() => {
        document
            .body
            .classList
            .add("presentation-page");
        window.addEventListener("scroll", checkScroll);
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document
                .body
                .classList
                .remove("presentation-page");
            window.removeEventListener("scroll", checkScroll);
        };
    });

    return (
        <> < WeidongNavbar {
            ...props
        } /> <div className="bg-white page-header page-header-xss"></div>
        <Col className="ml-auto mr-auto mt-4" xs="8" md="8" sm="8">
            <Card className="card-raised card-form-horizontal no-transition mb-4" id="card">
                <CardTitle>
                    <div id="con_body">
                        <div className="site_map_area">
                            <div className="site_map_box">
                                <h4 style={{background: '#0098e1'}}>
                                    <a href="/weidongIndex">e-Cargo</a>
                                </h4>
                                <ul>
                                    <li>
                                        <Link to="/dashboard" target="_top">DASHBOARD</Link>
                                    </li>
                                    <li>
                                        <Link to="/schedule" target="_top">SCHEDULE</Link>
                                    </li>
                                    <li>
                                        <Link to="/bookinglist" target="_top">REQUEST</Link>
                                    </li>
                                    <li>
                                        <Link to="/confirmlist" target="_top">CONFIRM</Link>
                                    </li>
                                    <li>
                                        <Link to="/srlist" target="_top">SR</Link>
                                    </li>
                                    <li>
                                        <Link to="/bllist" target="_top">BL</Link>
                                    </li>
                                    <li>
                                        <Link to="/vslocation" target="_top">LOCATION</Link>
                                    </li>
                                </ul>
                            </div>                           
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/schedule/list.do?menuKey=61">운항일정</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/schedule/list.do?menuKey=61" target="_top">운항일정조회</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/schedule/inoutList.do?menuKey=62" target="_top">선박입출항정보</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=308&contentKey=93" target="_top">선박안내</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=308&contentKey=93" target="_top">선박제원</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=314&contentKey=101" target="_top">객실안내</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=63&contentKey=38" target="_top">기본운항일정</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/article/list.do?menuKey=244&boardKey=4" target="_top">월간운항일정</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/content/view.do?menuKey=303&contentKey=20">수출입안내</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=303&contentKey=20" target="_top">수출안내</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=303&contentKey=20" target="_top">한국수출</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=304&contentKey=91" target="_top">OB/L탁송 및 SURRENDER</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=95&contentKey=37" target="_top">수입안내</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=95&contentKey=375" target="_top">한국수입</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=96&contentKey=35" target="_top">OB/L탁송 및 SURRENDER</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=97&contentKey=36" target="_top">화물 인도지시서 (D/O)</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/content/view.do?menuKey=70&contentKey=31">화물서비스</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=70&contentKey=31" target="_top">전자상거래 화물 서비스</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=101&contentKey=34" target="_top">복합운송 서비스</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=101&contentKey=34" target="_top">SEA&amp;RAIL</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=99&contentKey=33" target="_top">SEA&amp;SEA</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=98&contentKey=32" target="_top">SEA&amp;AIR</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=100&contentKey=64" target="_top">SEA&amp;LAND</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=68&contentKey=30" target="_top">특수화물 서비스
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=67&contentKey=29" target="_top">BULK 화물 서비스</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/article/list.do?menuKey=71&boardKey=0" target="_top">서식자료실</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/exp/mrn/view.do?menuKey=200">e-Service</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/exp/mrn/view.do?menuKey=200" target="_top">수출업무</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/exp/mrn/view.do?menuKey=200" target="_top">MRN 조회</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=102" target="_top">수출부킹</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=103" target="_top">부킹조회 및 수정</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=198" target="_top">수출 B/L 조회 및 출력</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=201" target="_top">INVOICE 조회 및 출력</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=202" target="_top">입금표 출력</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=181" target="_top">수입업무</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=184" target="_top">MRN/MSN 조회</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=185" target="_top">SURRENDER 확인</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=305" target="_top">수입 B/L 조회 및 출력</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=186" target="_top">수입 화물 위치 조회</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=204" target="_top">INVOICE 조회 및 출력</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=205" target="_top">입금표 출력</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=206" target="_top">A/N 출력</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=315" target="_top">전자세금계산서</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/cn/main.do?menuKey=58">컨테이너</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=86" target="_top">특수 컨테이너</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=85" target="_top">컨테이너 규격</a>
                                    </li>
                                </ul>
                            </div>    
                   
                       
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/content/view.do?menuKey=222&contentKey=47">회사소개</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=222&contentKey=47" target="_top">회사연혁</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=223&contentKey=48" target="_top">조직도</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=224&contentKey=49" target="_top">경영목표</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=239&contentKey=50" target="_top">안전약속</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/content/view.do?menuKey=452&contentKey=180" target="_top">위동전시관</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=452&contentKey=180" target="_top">위동의역사</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/content/view.do?menuKey=232&contentKey=56" target="_top">선박소개</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/bridge/frameView.do?menuKey=238" target="_top">사회공헌</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/cn/main.do?menuKey=59">담당자 및 위치안내</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=87" target="_top">담당자 및 연락처</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=104" target="_top">위동해운</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=105" target="_top">DTC</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=106" target="_top">영진공사 CY &amp; CFS</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=88" target="_top">회사위치안내</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=192" target="_top">서울</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=193" target="_top">인천</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=194" target="_top">웨이하이</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=196" target="_top">옌타이</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=197" target="_top">원덩</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=195" target="_top">칭다오</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=240" target="_top">황다오</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=241" target="_top">이우</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=242" target="_top">광저우</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=89" target="_top">협력업체위치안내(CY &amp; CFS)</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=211" target="_top">영진CY</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=212" target="_top">영진CFS</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=213" target="_top">선광신컨테이너터미널</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=214" target="_top">평택컨테이너터미널</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=309" target="_top">한진해운경인터미널</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div className="site_map_box">
                                <h4>
                                    <a href="https://cargo.weidong.com/cn/main.do?menuKey=208">기타페이지</a>
                                </h4>
                                <ul>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=245" target="_top">사이트맵</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=246" target="_top">로그인</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=216" target="_top">약관정책</a>
                                        <ul>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=219" target="_top">화물운송약관</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=220" target="_top">개인보호정책</a>
                                            </li>
                                            <li>
                                                <a href="https://cargo.weidong.com/cn/main.do?menuKey=217" target="_top">이용약관</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=215" target="_top">회원가입</a>
                                    </li>
                                    <li>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=311" target="_top">아이디/비밀번호찾기</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='site_map_wrap'>
                                <div className="site_map_box">
                                    <h4>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=247">마이페이지</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=248" target="_top">회원정보</a>
                                        </li>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=249" target="_top">회원탈퇴</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="site_map_box">
                                    <h4>
                                        <a href="https://cargo.weidong.com/cn/main.do?menuKey=250">고객센터</a>
                                    </h4>
                                    <ul>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=251" target="_top">공지사항</a>
                                        </li>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=253" target="_top">Q&amp;A</a>
                                        </li>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=254" target="_top">FAQ</a>
                                        </li>
                                        <li>
                                            <a href="https://cargo.weidong.com/cn/main.do?menuKey=252" target="_top">보도자료</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="site_map_box" style={{border:'none'}}></div>
                            </div>
                        </div>
                       
                    </div>
                </CardTitle>
            </Card>
        </Col>
        <FooterWeidong/>
    </>
    );
}

export default Sitemap;
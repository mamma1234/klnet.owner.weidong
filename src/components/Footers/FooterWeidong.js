/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a
                    href="https://cargo.weidong.com/content/view.do?menuKey=222&contentKey=47"
                    target="_blank"
                    className="mr-1"
                  >
                    회사소개
                  </a>
                </li>
                <li>
                  <a
                    href="https://cargo.weidong.com/content/view.do?menuKey=217&contentKey=43"
                    target="_blank"
                    className="mr-1"
                  >
                    이용약관
                  </a>
                </li>
                <li>
                  <a
                    href="https://cargo.weidong.com/content/view.do?menuKey=219&contentKey=45"
                    target="_blank"
                  >
                    화물운송약관
                  </a>
                </li>
                <li>
                  <a
                    href="https://cargo.weidong.com/content/view.do?menuKey=220&contentKey=46"
                    target="_blank"
                  >
                    개인정보처리방침
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:webmaster_kr@weidong.com"
                    target="_blank"
                  >
                    관리자문의
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1058151797&apv_perm_no=1058151797"
                    target="_blank"
                  >
                    사업자정보확인
                  </a>
                </li>
                <li>
                  <a
                    href="https://cargo.weidong.com/article/list.do?menuKey=251&boardKey=1"
                    target="_blank"
                  >
                    고객센터
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © 2020
                , made with <i className="fa fa-ship" /> by Weidong Ferry Co., Ltd.
              </span>
            </div>
          </Row>
          <hr className="mt-0 mb-0"/>
          <Row>
            <div>
              <h6 className="m-3">(주)위동해운 | 대표이사 : 전기정주소 | 서울시 마포구 큰우물로 75. 10층(도화동 성지빌딩) | 사업자등록번호 : 105-81-51797<br/>
                  수출 안내 : 02-3271-6781(위해), 02-3271-6782(청도) | 팩스 : 02-3271-6765~8 | 수입 안내 : 032-770-8080 | 팩스 : 032-770-8087~9<br/>
                  정보관리책임자 : 김형태 (kht@weidong.com) | 통신판매업신고 : 마포통신 제3488호</h6>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;

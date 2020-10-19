import React from "react";
import Select from "react-select";
import {

  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  Table,
  Container,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Input,
  Button
} from "reactstrap";
// reactstrap components

// carousel items
	const carouselItems = [
	  {
		src: require("assets/img/sections/1461732922829.gif"),
		//altText: "Somewhere",
		//caption: "Somewhere",
	  },
	  {
		src: require("assets/img/sections/1461666291903.gif"),
		//altText: "Somewhere else",
		//caption: "Somewhere else",
	  },
	  {
		src: require("assets/img/sections/1461732922828.gif"),
		//altText: "Here it is",
//caption: "Here it is",
	  },
	];
	
	const selectOptions = [
  { value: "0", label: "B/L No."},
  { value: "1", label: "Container No." },
];
	
const customStyles = {

  control: () => ({
    //width: width
	height:'34px',
	minHeight:'34px'
  }),
}

// core components

function IndexHeader() {
	const [activeIndex, setActiveIndex] = React.useState(0);
	const [animating, setAnimating] = React.useState(false);
	const [hTabs, setHTabs] = React.useState("1");
    const [vTabs, setVTabs] = React.useState("1");
	const [defaultSelect, setDefaultSelect] = React.useState(1);
	
    const onExiting = () => {
		setAnimating(true);
    };
	
	const onExited = () => {
		setAnimating(false);
	};

	const next = () => {
		if (animating) return;
		const nextIndex =
		  activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1;
		setActiveIndex(nextIndex);
	};
	
	const previous = () => {
		if (animating) return;
		const nextIndex =
		  activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1;
		setActiveIndex(nextIndex);
	};
	const goToIndex = (newIndex) => {
		if (animating) return;
		setActiveIndex(newIndex);
	 };
	 
	 const serviceTel = require("assets/img/sections/btn_widget1.gif");
	 const bookingService = require("assets/img/sections/btn_widget2.gif");
  

  
  return (
    <>
      <div className="main"
	     style={{paddingTop:'90px'}}
        //className="page-header"
        //style={{
          //backgroundImage: "url(" + require("assets/img/cover.jpg") + ")",
        //}}
      >
	  <div class="mt-auto">
		<Col className="ml-auto mr-auto" md="10">
		    <Card className="card-raised page-carousel">
							<Carousel
							  activeIndex={activeIndex}
							  next={next}
							  previous={previous}
							>
							  <CarouselIndicators
								items={carouselItems}
								activeIndex={activeIndex}
								onClickHandler={goToIndex}
							  />
							  {carouselItems.map((item) => {
								return (
								  <CarouselItem
									onExiting={onExiting}
									onExited={onExited}
									key={item.src}
								  >
									<img src={item.src} alt={item.altText} />

								  </CarouselItem>
								);
							  })}
							  <a
								className="left carousel-control carousel-control-prev"
								data-slide="prev"
								href="#pablo"
								onClick={(e) => {
								  e.preventDefault();
								  previous();
								}}
								role="button"
							  >
								<span className="fa fa-angle-left" />
								<span className="sr-only">Previous</span>
							  </a>
							  <a
								className="right carousel-control carousel-control-next"
								data-slide="next"
								href="#pablo"
								onClick={(e) => {
								  e.preventDefault();
								  next();
								}}
								role="button"
							  >
								<span className="fa fa-angle-right" />
								<span className="sr-only">Next</span>
							  </a>
							</Carousel>
						  </Card>
			</Col>
	    </div>
		<Container>
		    <Row>
				<Col className="mr-auto" md="8">
					<h4 className="title" style={{marginTop:'0',marginBottom:'0'}}>
						<small>화물선 실시간 운항정보 (2020/10/13)</small>
					</h4>
				 <Table responsive>
					<thead>
					  <tr>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>선명</th>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>선박코드</th>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>항차</th>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>출발일시(현지시간기준)</th>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>도착일시(현지시간기준)</th>
						<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>상태</th>
					  </tr>
					</thead>
					<tbody>
					  <tr>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>NEW GOLDEN BRIDGE V</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>GBF</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2435E</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2020/10/12 17:30(청도)</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2020/10/13 11:50 (인천)</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>도착</td>
					  </tr>
					  <tr>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>NEW GOLDEN BRIDGE V</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>GBF</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2436W</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2020/10/13 18:30 (인천)</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>2020/10/14 09:00 (청도)</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>.......</td>
					  </tr>
					  <tr>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
					  </tr>
					  <tr>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
						<td style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px'}}>&nbsp;</td>
					  </tr>
					</tbody>
				  </Table>
				</Col>
				<Col>
					<Container>
						<Row>
							<Col><img src={serviceTel} style={{width:'260px'}}/></Col>
							<Col><img src={bookingService} style={{width:'260px'}}/></Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
		<Container>
		    <Row>
				<Col className="mr-auto" md="8">
					<h4 className="title" style={{marginTop:'0',marginBottom:'0'}}>
						<small>화물선 실시간 운항정보 (2020/10/13)</small>
					</h4>
					<Table responsive>
						<thead>
						  <tr>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>선명</th>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>선박코드</th>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>항차</th>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>출발일시(현지시간기준)</th>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>도착일시(현지시간기준)</th>
							<th style={{paddingTop:'3px',paddingBottom:'3px',fontSize:'13px',backgroundColor:'#efebeb',color:'#0050a7'}}>상태</th>
						  </tr>
						</thead>
						<tbody>
						  <tr>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>MV.BEI HAI</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>MBH</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>0295W</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/13 00:00 (인천)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/16 00:00 (장가항)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>운항중</td>
						  </tr>
						  <tr>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>MV.BEI HAI</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>MBH</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>0295W</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/13 00:00 (인천)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/17 00:00 (태창)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>운항중</td>
						  </tr>
						  <tr>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>REVERENCE</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>REV</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>1730E</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/12 03:00 (청도)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/13 03:00 (인천)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>도착</td>
						  </tr>
						  <tr>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>REVERENCE</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>REV</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>1731W</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/13 00:00 (인천)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/14 00:00 (청도)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>운항중</td>
						  </tr>
						  <tr>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>HANSUNG INCHEON</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>MHI</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2681E</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/12 21:00 (위해)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>2020/10/13 13:00 (인천)</td>
							<td style={{paddingTop:'3px',paddingBottom:'3px'}}>운항중</td>
						  </tr>
						</tbody>
					</Table>
				</Col>
				<Col>
					<Container>
						<Row>
							<Col md="10">
								<div className="nav-tabs-navigation" style={{marginBottom:'10px'}}>
									<div className="nav-tabs-wrapper">
										<Nav id="tabs" role="tablist" tabs >
											<NavItem>
											  <NavLink
												className={hTabs === "1" ? "active" : ""}
												onClick={() => {
												  setHTabs("1");
												}}
												style={{paddingLeft:'6px',fontSize:'10px'}}
											  >
												화물위치조회(페리선)
											  </NavLink>
											</NavItem>
											<NavItem>
											  <NavLink
												className={hTabs === "2" ? "active" : ""}
												onClick={() => {
												  setHTabs("2");
												}}
												style={{paddingLeft:'6px',fontSize:'10px'}}
											  >
												화물위치조회(화물선)
											  </NavLink>
											</NavItem>
										</Nav>
									</div>
								</div>
								<TabContent className="text-center" activeTab={"hTabs" + hTabs} style={{marginBottom:'10px'}}>
									<TabPane tabId="hTabs1" >
										<Container>
											<Row>
												<Col md="4" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}> 
													<Select
														name="defaultSelect"
														value={defaultSelect}
														onChange={(value) => setDefaultSelect(value)}
														options={selectOptions}
														//placeholder="CHOOSE CITY"
													  />
												</Col>
												<Col md="5" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}>
													<Input defaultValue="" placeholder="" type="text" style={{paddingTop:'0',paddingBottom:'0',paddingLeft:'5px',paddingRight:'5px',height:'38px'}}/>
												</Col>
												<Col md="3" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}><Button color="info"  size ="sm" block style={{height:'38px'}}>조회</Button></Col>
											</Row>
										</Container>
									</TabPane>
									<TabPane tabId="hTabs2">
									  <Container>
											<Row>
												<Col md="4" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}> 
													<Select
														name="defaultSelect"
														value={defaultSelect}
														onChange={(value) => setDefaultSelect(value)}
														options={selectOptions}
														//placeholder="CHOOSE CITY"
													  />
												</Col>
												<Col md="5" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}>
													<Input defaultValue="" placeholder="" type="text" style={{paddingTop:'0',paddingBottom:'0',paddingLeft:'5px',paddingRight:'5px',height:'38px'}}/>
												</Col>
												<Col md="3" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}><Button color="info"  size ="sm" block style={{height:'38px'}}>조회</Button></Col>
											</Row>
										</Container>
									</TabPane>
								</TabContent>
							</Col>
						</Row>
						<Row>
							<Col md="10">
								<Container>
									<Row style={{borderTop:'2px solid',borderLeft:'1px solid silver',borderRight:'1px solid silver',borderBottom:'1px solid silver'}}>
										<Col style={{paddingTop:'10px',paddingBottom:'10px'}}>Surrender 확인</Col>
									</Row>
									<Row style={{borderLeft:'1px solid silver',borderRight:'1px solid silver',borderBottom:'1px solid silver'}}>
										<Col style={{paddingTop:'5px',paddingBottom:'5px',paddingLeft:'0',paddingRight:'0'}}>
											<Container>
												<Row>
													<Col style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}>
														<Container>
															<Row>
																<Col md="4" style={{paddingTop:'8px',paddingLeft:'5px',paddingRight:'2px'}}>B/L No.</Col>
																<Col style={{paddingLeft:'2px',paddingRight:'0px'}}>
																	<Input defaultValue="" placeholder="" type="text" style={{paddingTop:'0',paddingBottom:'0',paddingLeft:'5px',paddingRight:'5px',height:'38px'}}/>
																</Col>
															</Row>
														</Container>
													</Col>
													<Col md="3" style={{paddingLeft:'2px',paddingRight:'2px',paddingTop:'5px'}}><Button color="info"  size ="sm" block style={{height:'38px'}}>조회</Button></Col>
												</Row>
											</Container>
										</Col>
									</Row>
								</Container>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
      </div>
    </>
  );
}

export default IndexHeader;

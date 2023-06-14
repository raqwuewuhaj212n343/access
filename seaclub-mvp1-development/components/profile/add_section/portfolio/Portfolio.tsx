import img1 from "../../../../public/assets/add_section/images/Portfolio/img1.svg";
import img2 from "../../../../public/assets/add_section/images/Portfolio/img2.svg";
import img3 from "../../../../public/assets/add_section/images/Portfolio/img3.svg";
import img4 from "../../../../public/assets/add_section/images/Portfolio/img4.svg";
import HashiCorp from "../../../../public/assets/add_section/icons/Portfolio/HashiCorp.svg";
import banner from "../../../../public/assets/add_section/images/Portfolio/banner.svg";

import img21 from "../../../../public/assets/add_section/images/Portfolio/img21.svg";
import img22 from "../../../../public/assets/add_section/images/Portfolio/img22.svg";
import img31 from "../../../../public/assets/add_section/images/Portfolio/img31.svg";
import img32 from "../../../../public/assets/add_section/images/Portfolio/img32.svg";
import Image from "next/image";
import style from "../../../../src/styles/profile/addSection.module.css";
import { useRouter } from "next/router";
const Portfolio = () => {
	const router = useRouter();
	const editPortfolioRoute: string = "/edit-template/portfolio";
	const handleEditFirstPortfolio = () => {
		router.push(`${editPortfolioRoute}/1`);
	};
	const handleEditSecondPortfolio = () => {
		router.push(`${editPortfolioRoute}/2`);
	};
	const handleEditThirdPortfolio = () => {
		router.push(`${editPortfolioRoute}/3`);
	};
	return (
		<>
			<h3 className={style.portfolioMainTitle}>Portfolio templates</h3>
			<p className={style.portfolioMainP}>
				Please choose from our selection of pre-designed templates below
				to help you create the best section for your company
			</p>
			<div className={style.portfolioMainContainer}>
				<div className={style.portfoliofrstCard}>
					<div className={style.portfoliofrstCardOverlay}>
						<button onClick={handleEditFirstPortfolio}>
							Use template
						</button>
					</div>
					<div>
						<h3>Write your tittle here. Click to edit.</h3>
					</div>
					<div>
						<p>
							This is a paragraph, you can use it to add any
							information to share with possible clients. Click
							here to edit the text.
						</p>
					</div>
					<div className={style.imgsContainer}>
						<Image src={img1} alt="img1" />
						<Image src={img2} alt="img2" />
						<Image src={img3} alt="img3" />
						<Image src={img4} alt="img4" />

						<Image src={img1} alt="img1" />
						<Image src={img2} alt="img2" />
						<Image src={img3} alt="img3" />
						<Image src={img4} alt="img4" />
					</div>
					<div>
						<p>Write your tittle here. Click to edit</p>
					</div>

					<div className={style.footer}>
						<Image src={HashiCorp} alt="HashiCorp" />
						<Image src={HashiCorp} alt="HashiCorp" />
						<Image src={HashiCorp} alt="HashiCorp" />
					</div>
				</div>
				<div className={style.portfolioSecondtCard}>
					<div className={style.portfoliofrstCardOverlay}>
						<button onClick={handleEditSecondPortfolio}>
							Use template
						</button>
					</div>
					<div className={style.portfolioSecondTitle}>
						<h3>Write your tittle here. Click to edit.</h3>
					</div>
					<div className={style.portfolioSecondP}>
						<p>
							This is a paragraph, you can use it to add any
							information to share with possible clients. Click
							here to edit the text.
						</p>
					</div>
					<div
						style={{ backgroundImage: `url(${banner.src})` }}
						className={style.portfolioSecondBanner}
					>
						<div className={style.pContainer}>
							<p>
								This is a paragraph, you can use it to add any
								information to share with possible clients.
								Click here to edit the text.
							</p>
						</div>
					</div>
					<div className={style.imgsContainer1}>
						<div className={style.sectionContainerCard}>
							<div className={style.imgContainer}>
								<Image src={img21} alt="img21" />
							</div>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
						</div>
						<div className={style.sectionContainerCard}>
							<div className={style.imgContainer}>
								<Image src={img22} alt="img22" />
							</div>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
						</div>
						<div className={style.sectionContainerCard}>
							<div className={style.imgContainer}>
								<Image src={img21} alt="img21" />
							</div>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
						</div>
						<div className={style.sectionContainerCard}>
							<div className={style.imgContainer}>
								<Image src={img22} alt="img22" />
							</div>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
						</div>
					</div>
					<div>
						<p></p>
					</div>

					<div className={style.footer2}>
						<h3>Write your tittle here. Click to edit.</h3>
					</div>
				</div>

				<div className={style.portfolioSecondtCard}>
					<div className={style.portfoliofrstCardOverlay}>
						<button onClick={handleEditThirdPortfolio}>
							Use template
						</button>
					</div>
					<div className={style.portfolioSecondTitle}>
						<h3>Write your tittle here. Click to edit.</h3>
					</div>
					<div className={style.portfolioSecondP}>
						<p>
							This is a paragraph, you can use it to add any
							information to share with possible clients. Click
							here to edit the text.
						</p>
					</div>
					<div className={style.imgsContainer1}>
						<div className={style.sectionContainerCard2}>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
							<div className={style.imgContainer}>
								<Image src={img31} alt="img31" />
							</div>
						</div>
						<div className={style.sectionContainerCard2}>
							<div className={style.pContainer}>
								<p className={style.Containerp}>
									This is a paragraph, you can use it to add
									any information to share with possible
									clients. Click here to edit the text.
								</p>
							</div>
							<div className={style.imgContainer}>
								<Image src={img32} alt="img32" />
							</div>
						</div>
					</div>
					<div>
						<p></p>
					</div>
					<div className={style.footer3}>
						<div className={style.portfolioSecondTitle}>
							<h3>Write your tittle here. Click to edit.</h3>
						</div>
						<div className={style.portfolioSecondP}>
							<p>
								This is a paragraph, you can use it to add any
								information to share with possible clients.
								Click here to edit the text.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Portfolio;

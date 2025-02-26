import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/homepage.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import CustomCodeEditor from "../components/CustomEditor";

// 이미지 import
import mainImg from "../assets/images/main_page.png";

// sections 정의
const sections = [
  { id: "how-to-use1", title: "1. 프로젝트 회원가입", description: "간단한 가입 후 프로젝트를 시작하세요.", img: mainImg },
  { id: "how-to-use2", title: "2. 코드 입력", description: "리뷰하고 싶은 코드를 입력하세요.", img: "code-input.png" },
  { id: "how-to-use3", title: "3. 리뷰 실행", description: "AI가 코드를 분석하여 리뷰를 제공합니다.", img: "review-process.png" },
  { id: "how-to-use4", title: "4. 리뷰 피드백 확인", description: "리뷰 내용을 확인하고 개선하세요.", img: "feedback.png" },
  { id: "review-preview", title: "🔍 리뷰 기능 미리보기", description: "AI 기반 리뷰 시스템을 직접 체험해보세요." },
];

// ✅ 스크롤할 섹션 개수 + 1 (review-preview 포함)
const TOTAL_SECTIONS = sections.length + 2;

const Homepage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const navigate= useNavigate();
  const [scrollLock, setScrollLock] = useState(false); // ✅ 스크롤 잠금 상태 추가

  // ✅ 스크롤 관리 함수 (모든 섹션 포함)

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (scrollLock) return;

      if (Math.abs(event.deltaY) > 60) {
        setScrollLock(true);

        if (event.deltaY > 0) {
          setCurrentSection((prev) => Math.min(prev + 1, TOTAL_SECTIONS - 1));
        } else {
          setCurrentSection((prev) => Math.max(prev - 1, 0));
        }

        setTimeout(() => setScrollLock(false), 1000);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollLock]);

  const redirectLoginPage = () => {
    navigate("/login");
  }
  return (
    <div className="homepage">
      <motion.div
        className="sections-container"
        animate={{ translateY: `-${currentSection * 100}vh` }}
        transition={{ ease: "easeInOut", duration: 0.8 }}
      >
        {/* ✅ Hero 섹션 */}
        <section className="hero-section">
          <div hero-mention>
            <h1>알고리뷰와 함께 맞춤형 코드리뷰를 받아보세요</h1>
          </div>
          <CustomCodeEditor />
          <Button label="리뷰 시작하기" icon="pi pi-play" className="p-button-primary p-button-lg" style={{marginTop: "20px", padding:"12px 48px", borderRadius:"100px"}} onClick={()=> redirectLoginPage()} />
        </section>

        {/* 알고리뷰 핵심 가치 섹션 */}
<section className="hero-subsection">
  <div className="slider-container">
    <motion.div 
      className="slide"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>AI 기반 코드 리뷰</h2>
      <p>고민 중인 문제에 대해 30초 안에 리뷰를 받아보세요</p>
    </motion.div>

    <motion.div 
      className="slide"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2>개선 방향 & 모범 답안</h2>
      <p>세부적인 개선 방향을 확인하고, 최적화된 코드 예시까지 받아보세요</p>
    </motion.div>

    <motion.div 
      className="slide"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2>실시간 재리뷰 & 챗봇 서비스</h2>
      <p>최적의 코드에 도전하시고, 언제든 질문하세요</p>
    </motion.div>
  </div>
</section>

        {/* ✅ 기존 sections도 스크롤 포함 */}
        {sections.map((section) => (
          <section key={section.id} className="section">
            {section.id === "review-preview" ? (
              <div className="review-preview">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <div className="review-container">
                  {/* ✅ Code Input */}
                  <Card className="code-input-card">
                    <h3>📝 코드 입력</h3>
                    <CodeMirror
                      value={`function add(a, b) {\n  return a + b;\n}`}
                      extensions={[javascript()]}
                      style={{ height: "200px", fontSize: "14px" }}
                    />
                  </Card>

                  {/* ✅ Code Review Result */}
                  <Card className="code-output-card">
                    <h3>✅ 리뷰 결과</h3>
                    <p>⚠️ 'return' 키워드 사용 시, 타입 검사를 추가하는 것이 좋습니다.</p>
                  </Card>
                </div>
              </div>
            ) : (
            <div className="step-container">
              <img src={section.img} alt={section.title} />
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
            )}
          </section>
        ))}
      </motion.div>
    </div>
  );
};

export default Homepage;

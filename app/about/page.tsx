'use client';

import { VscGithub, VscMail, VscFilePdf } from 'react-icons/vsc';
import Link from 'next/link';

import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1 className={styles.name}>Jader Cerqueira</h1>
              <p className={styles.role}>Software Engineer</p>
              <div className={styles.location}>
                <span className={styles.dot} />
                Brazil
              </div>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <a 
              href="/vitaeCurriculum.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.iconButton}
              title="Download CV"
            >
              <VscFilePdf size={20} />
            </a>
            <a 
              href="https://github.com/zinhoCerqueira" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.iconButton}
            >
              <VscGithub size={20} />
            </a>
            <Link href="/contact" className={styles.iconButton}>
              <VscMail size={20} />
            </Link>
          </div>
        </header>

        <div className={styles.content}>
          {/* Bio Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>01</span>
              <h2 className={styles.sectionTitle}>About</h2>
            </div>
            
            <div className={styles.sectionBody}>
              <p className={styles.paragraph}>
                Formado em Engenharia da Computação na UEFS (Universidade Estadual de Feira de Santana).
              </p>
              <p className={styles.paragraph}>
                Desenvolvedor full-stack com experiências profissionais com Python (Flask), Vue.js e PHP (Yii). Apaixonado por construir aplicações robustas e escaláveis, sempre buscando aprender novas tecnologias e melhores práticas de desenvolvimento.
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>02</span>
              <h2 className={styles.sectionTitle}>Skills</h2>
            </div>
            
            <div className={styles.sectionBody}>
              <div className={styles.skillsGrid}>
                <div className={styles.skillCategory}>
                  <h3 className={styles.skillTitle}>Backend</h3>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>PHP (Yii)</span>
                    <span className={styles.skillTag}>Python (Flask)</span>
                    <span className={styles.skillTag}>Java (SpringBoot)</span>
                  </div>
                </div>
                <div className={styles.skillCategory}>
                  <h3 className={styles.skillTitle}>Frontend</h3>
                  <div className={styles.skillTags}>
                    <span className={styles.skillTag}>Vue.js</span>
                    <span className={styles.skillTag}>Javascript</span>
                    <span className={styles.skillTag}>Typescript</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>03</span>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </div>
            
            <div className={styles.sectionBody}>
              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jan 2025 — Jan 2026</span>
                </div>
                <h3 className={styles.expRole}>Estágio // Desenvolvedor FullStack</h3>
                <p className={styles.expCompany}>Conexa</p>
                <ul className={styles.expList}>
                  <li>Atuei no desenvolvimento e manutenção do core de um sistema web de gestão de coworking.</li>
                  <li>Implementei APIs e regras de negócio para gerenciamento de usuários, planos e agendamentos.</li>
                  <li>Desenvolvi funcionalidades voltadas para gestão de e-mails e fluxos internos.</li>
                  <li>Colaborei com a equipe no desenvolvimento de novas funcionalidades e manutenção de módulos centrais.</li>
                  <li><strong>Tech:</strong> PHP (Yii), Javascript (jQuery, Vue.js), MySQL, Docker.</li>
                </ul>
              </div>

              <div className={styles.experienceCard}>
                <div className={styles.expMeta}>
                  <span className={styles.expPeriod}>Jan 2024 — Presente</span>
                </div>
                <h3 className={styles.expRole}>Desenvolvedor FullStack (Freelance)</h3>
                <p className={styles.expCompany}>Projetos Autônomos</p>
                <ul className={styles.expList}>
                  <li>Concebi e implementei sistemas web educacionais completos, desde a ideia até o deploy.</li>
                  <li>Levantei requisitos e defini regras de negócio diretamente com os clientes.</li>
                  <li>Atuei em todas as camadas (Fullstack): Frontend, Backend e Modelagem de Banco de Dados.</li>
                  <li>Garanti o funcionamento e a evolução contínua das plataformas através de manutenções constantes.</li>
                  <li><strong>Tech:</strong> Vue.js, Flask (Python), MongoDB.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <Link href="/projects" className={styles.footerLink}>
            View my projects →
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;

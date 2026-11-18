'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '@/styles/EntertainmentPage.module.css';

const EntertainmentPage = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Restricted Access System v1.0.4',
    'Type "help" for available commands.',
    '',
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    const fullCmd = inputValue.trim();
    setTerminalLines((prev) => [...prev, `$ ${fullCmd}`]);
    setInputValue('');

    if (fullCmd === 'sudo unlock --vault') {
      setIsProcessing(true);
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, 'Searching for credentials...', 'Access granted!', 'Unlocking vault...']);
        setTimeout(() => {
          setIsUnlocked(true);
          setIsProcessing(false);
        }, 1000);
      }, 800);
    } else if (fullCmd === 'help') {
      setTerminalLines((prev) => [...prev, 'Available commands:', '  help               - Show this help', '  sudo unlock --vault - Unlock the private vault', '  clear              - Clear terminal']);
    } else if (fullCmd === 'clear') {
      setTerminalLines([]);
    } else {
      setTerminalLines((prev) => [...prev, `Command not found: ${fullCmd.split(' ')[0]}`]);
    }
  };

  if (isUnlocked) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the Vault</h1>
        <div className={styles.grid}>
          <section className={styles.section}>
            <h2>🎬 Movies</h2>
            <p>Em breve: Minha lista de filmes favoritos.</p>
          </section>
          <section className={styles.section}>
            <h2>📚 Books</h2>
            <p>Em breve: Meus livros e leituras atuais.</p>
          </section>
          <section className={styles.section}>
            <h2>🎮 Games</h2>
            <p>Em breve: O que ando jogando.</p>
          </section>
        </div>
        <button className={styles.lockBtn} onClick={() => setIsUnlocked(false)}>
          Lock Vault
        </button>
      </div>
    );
  }

  return (
    <div className={styles.terminalWrapper} onClick={() => inputRef.current?.focus()}>
      <div className={styles.terminalHeader}>
        <span className={styles.dot} style={{ backgroundColor: '#ff5f57' }}></span>
        <span className={styles.dot} style={{ backgroundColor: '#febc2e' }}></span>
        <span className={styles.dot} style={{ backgroundColor: '#28c840' }}></span>
        <span className={styles.terminalTitle}>bash — Restricted Vault</span>
      </div>
      <div className={styles.terminalBody} ref={terminalRef}>
        {terminalLines.map((line, i) => (
          <div key={i} className={styles.line}>
            {line}
          </div>
        ))}
        <form onSubmit={handleCommand} className={styles.inputLine}>
          <span className={styles.prompt}>$</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isProcessing}
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      <div className={styles.hint}>Hint: sudo unlock --vault</div>
    </div>
  );
};

export default EntertainmentPage;

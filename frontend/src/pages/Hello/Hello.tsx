import { useState } from 'react';
import { useGetHelloQuery, useGetHelloCustomQuery } from '../../features/hello';
import { Loading } from '../../components/Loading';
import styles from './Hello.module.css';

export function Hello() {
  const [customMessage, setCustomMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const {
    data: defaultData,
    isLoading: isDefaultLoading,
    error: defaultError,
  } = useGetHelloQuery();

  const {
    data: customData,
    isLoading: isCustomLoading,
    error: customError,
  } = useGetHelloCustomQuery(submittedMessage!, {
    skip: !submittedMessage,
  });

  const isLoading = isDefaultLoading || isCustomLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMessage.trim()) {
      setSubmittedMessage(customMessage.trim());
    }
  };

  if (isLoading) {
    return <Loading message="Fetching greeting..." />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello API Demo</h1>

      <div className={styles.card}>
        <h2>Default Greeting</h2>
        {defaultError ? (
          <div className={styles.error}>Failed to load greeting</div>
        ) : (
          <>
            <p className={styles.message}>{defaultData?.data?.message}</p>
            <p className={styles.timestamp}>
              Response at: {defaultData?.timestamp}
            </p>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Enter custom message"
            className={styles.input}
          />
          <button type="submit" className={styles.button} disabled={!customMessage.trim()}>
            Send
          </button>
        </div>
      </form>

      {submittedMessage && (
        <div className={styles.card}>
          <h2>Custom Greeting</h2>
          {customError ? (
            <div className={styles.error}>Failed to load custom greeting</div>
          ) : (
            <>
              <p className={styles.message}>{customData?.data?.message}</p>
              <p className={styles.timestamp}>
                Response at: {customData?.timestamp}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

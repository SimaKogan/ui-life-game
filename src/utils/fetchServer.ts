type InitProps = {
  areaSize: number;
  setErrorServerConnection: (e: string) => void;
}

type ResponseInitProps = {
  message: string;
  areaSize: number;
  alives: number;
}

type ResponseNextProps = {
  generation: number;
  alives: number;
}

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const body = await response.json();
    return body.message || fallback;
  } catch {
    return `${fallback} (HTTP ${response.status})`;
  }
}

export const fetchServerInit = async ({ areaSize, setErrorServerConnection }: InitProps): Promise<ResponseInitProps | null> => {
  try {
    const response = await fetch(`/proxy/init/${areaSize}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ key: 'value' }),
    });

    if (!response.ok) {
      setErrorServerConnection(await readErrorMessage(response, 'Error initializing server'));
      return null;
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Error: ', error);
    setErrorServerConnection(error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

export const fetchServerNext = async (setErrorServerConnection: (e: string) => void): Promise<ResponseNextProps> => {
  const failed: ResponseNextProps = { generation: -1, alives: -1 };
  try {
    const response = await fetch('/proxy/next', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      setErrorServerConnection(await readErrorMessage(response, 'Error fetching next generation'));
      return failed;
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Error: ', error);
    setErrorServerConnection(error instanceof Error ? error.message : 'Unknown error');
    return failed;
  }
}

export const fetchServerDelete = async (): Promise<void> => {
  try {
    await fetch('/proxy/del', { method: 'DELETE', credentials: 'include' });
  } catch (error: unknown) {
    console.error('Error: ', error);
  }
}

export const fetchServerWakeUp = async (): Promise<string> => {
  try {
    const response = await fetch('/proxy/wakeup', { method: 'GET' });
    if (response.status === 200) {
      return 'Server is awake';
    }
    throw new Error(`Failed to wake up the server. Status: ${response.status}`);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'An unknown error occurred';
    console.error('Error: ', message);
    throw new Error(message);
  }
}

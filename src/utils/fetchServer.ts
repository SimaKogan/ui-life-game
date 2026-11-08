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

export const fetchServerInit = async ({ areaSize, setErrorServerConnection }: InitProps): Promise<ResponseInitProps | null> => {
  let data: ResponseInitProps | null = null;
  try {
    const response = await fetch(`/proxy/init/${areaSize}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ key: 'value' })
    });

    if (response.status == 400) {
      const errorData = await response.json();
      setErrorServerConnection(errorData.message);
      return null;

    }

    if (!response.ok) {
      const errorData = await response.json();
      setErrorServerConnection(errorData.message || 'Error initializing server');
      return null;
    }

    data = await response.json();

    console.log(data);

  } catch (error: any) {
    console.error('Error: ', error);
    if (error instanceof Error) {
      setErrorServerConnection(error.message);
    } else {
      setErrorServerConnection('Unknown error');
    }

  };

  return data;
}

export const fetchServerNext = async (setErrorServerConnection: (e: string) => void): Promise<ResponseNextProps> => {
  let data: ResponseNextProps = { generation: -1, alives: -1 };
  try {
    const response = await fetch('/proxy/next', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response from /next:", errorData);
      setErrorServerConnection(errorData.message || 'Error fetching next generation');
      return data;  }


    data = await response.json();
    console.log("generation: ", data.generation, "lives: ", data.alives);

  } catch (error: any) {
    console.error('Error: ', error.message);
    setErrorServerConnection(error.message);
  };

  return data;
}

export const fetchServerWakeUp = async (): Promise<string> => {
  try {
    const response = await fetch('/proxy/wakeup', {
      method: 'GET'
    });
    if (response.status === 200) {
      return 'Server is awake!';
    } else {
      throw new Error(`Failed to wake up the server. Status: ${response.status}`);
    }

  } catch (e: any) {
    console.error('Error: ', e.message);
    throw new Error(e.message || 'An unknown error occurred');
  }
}
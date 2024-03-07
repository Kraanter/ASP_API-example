type LoginProps = {
  email: string;
  password: string;
}

type LoginResponse = {
  tokenType: string;
  accessToken: string;
}

type ErrorResponse = {
  title: string;
}

type RequestResponse<T> = [undefined, ErrorResponse] | [T]

// TODO: this function can throw at least 3 different exceptions not handled at the moment
export async function sendLoginRequest(props: LoginProps): Promise<RequestResponse<LoginResponse>> {
  const body = JSON.stringify(props);
  const resp = await fetch('/api/login', {
    headers: {
      "Content-Type": "Application/json"
    },
    method: 'POST',
    body
  })

  const json = await resp.json();

  if (!resp.ok)
    return [, json as ErrorResponse]

  return [json as LoginResponse];
}

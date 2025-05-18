import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { TAuth } from "../types/TAuth";
import axios from "../api/axios";

export const AuthComponent: React.FC = () => {
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState(true);
  const [data, setData] = useState<TAuth>({
    email: "",
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const url = isLog ? "/auth/login" : "/auth/register";
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError("Произошла ошибка, попробуйте позже");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onClick={() => navigate("/")}
      className='relative flex justify-center items-center h-screen overflow-hidden bg-linear-to-b from-blue-900 to-black'
    >
      <video
        className='absolute top-0 bottom-0 left-0 right-0 object-cover h-full w-full'
        autoPlay
        muted
        loop
        playsInline
      >
        <source src='../../assets/videos/auth_bg.mp4' />
        Browser doesn't support background-video
      </video>
      <form
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col bg-white items-center h-3/5 w-2/3 z-10 lg:w-1/4'
        method='post'
        onSubmit={handleSubmit}
      >
        <h1 className='mt-5 bg-black pt-2 pb-2 items-center text-white w-full flex justify-center text-4xl font-bold'>
          {isLog ? "Sign in" : "Sign up"}
        </h1>
        <div className='flex flex-col items-center mt-5 w-full'>
          <label
            className='text-2xl font-bold bg-red-200 w-full flex justify-center'
            htmlFor='email'
          >
            email
          </label>
          <input
            className='rounded-lg border-blue-500 border-1 mt-3 h-8 pl-3 w-11/12'
            type='text'
            name='email'
            value={data.email}
            onChange={handleChange}
          />
        </div>
        {!isLog && (
          <div className='flex flex-col items-center mt-5 w-full'>
            <label
              className='text-2xl font-bold bg-red-200 w-full flex justify-center'
              htmlFor='login'
            >
              username
            </label>
            <input
              className='rounded-lg border-blue-500 border-1 mt-3 h-8 pl-3 w-11/12'
              type='text'
              name='login'
              value={data.login}
              onChange={handleChange}
            />
          </div>
        )}
        <div className='flex flex-col items-center mt-5 w-full'>
          <label
            className='text-2xl font-bold w-full bg-red-200 flex justify-center'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='rounded-lg border-blue-500 border-1 mt-3 h-8 pl-3 w-11/12'
            type='password'
            name='password'
            value={data.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-red-500 mt-3'>{error}</p>}
        <button
          type='submit'
          className={`self-end bg-black text-white min-h-10 min-w-30 rounded-md mr-3 border-2 cursor-pointer ${
            isLog ? "mt-10" : "mt-3"
          } hover:bg-white hover:text-black transition-all duration-300 ease-in-out`}
          disabled={loading}
        >
          {loading ? (
            <>
              <p>
                Loading...{" "}
                <span className='w-5 h-5 animate-spin border-3 border-white border-t-transparent'></span>
              </p>
            </>
          ) : isLog ? (
            "Sign in"
          ) : (
            "Sign up"
          )}
        </button>
        {isLog ? (
          <a
            onClick={() => setIsLog(false)}
            className='underline decoration-2 cursor-pointer hover:text-red-200 transition-all duration-300 ease-in-out mt-auto'
          >
            Don't have an account yet?
          </a>
        ) : (
          <a
            onClick={() => setIsLog(true)}
            className='underline decoration-2 cursor-pointer hover:text-red-200 transition-all duration-300 ease-in-out mt-auto'
          >
            Have already account?
          </a>
        )}
      </form>
    </div>
  );
};

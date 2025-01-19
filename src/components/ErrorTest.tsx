const ErrorTest = () => {
  return (
    <button
      className="border bg-gray-800 text-slate-50"
      onClick={() => {
        throw new Error("This is your first error!");
      }}
    >
      에러 발생 버튼
    </button>
  );
};

export default ErrorTest;

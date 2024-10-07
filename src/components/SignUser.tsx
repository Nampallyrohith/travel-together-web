import startImg from "@/assets/start-img.jpg"

const SignUser = () => {
  return (
    <div className="bg-background-start w-full h-full flex justify-center items-center">
      <div className=" w-1/2">
        <img src={startImg} alt="travel-img" className="w-2/5" />
      </div>
      <div className="w-1/2">
            <h1>form</h1>
      </div>
    </div>
  );
};

export default SignUser;

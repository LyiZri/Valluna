export default function LoginCard(props: any) {
  return (
    <div className="h-full w-full flex flex-col justify-center">
      <div className="w-full h-auto flex justify-center">
        <div className="bg-card-bg rounded-2xl">
        <div className="text-white py-8 px-16 text-center">
          {props.children}

          </div>
          </div>
      </div>
    </div>
  );
}

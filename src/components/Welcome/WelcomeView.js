export const WelcomeView = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <dialog open>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
      <dialog open>
        <p>Welcome</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    </div>
  );
};

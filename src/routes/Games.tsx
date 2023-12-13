import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";

export default function Games() {
  function GameDetails() {
    return (
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-2xl font-bold">GAME NAME</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex items-center justify-center gap-8 p-8">
            <p>PINA KA CHUY NGA DESCRIPTION AMASDUIJASUIDSAUIDNSAUIDNSIADU</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button>View Participants</Button>
        </CardFooter>
      </Card>
    );
  }
  const games = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {games.map((index) => (
        <GameDetails key={index} />
      ))}
    </div>
  );
}

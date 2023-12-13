import { Button, Card, CardBody, Link } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      Home
      <Card className="h-64 w-96 transform transition-transform hover:scale-110 hover:bg-gray-700">
        <Button className="h-64 w-96">
          <CardBody className="flex items-center justify-center font-bold">
            <p className="text-2xl">Create Event</p>
          </CardBody>
        </Button>
      </Card>
      <div className="flex items-center justify-around gap-10">
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Link href="/games">
            <Button className="h-32 w-64">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Game Library</p>
              </CardBody>
            </Button>
          </Link>
        </Card>
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Link href="/events">
            <Button className="h-32 w-64">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">View Events</p>
              </CardBody>
            </Button>
          </Link>
        </Card>
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Link href="/players">
            <Button className="h-32 w-64">
              <CardBody className="flex items-center justify-center font-bold">
                <p className="text-2xl">Players</p>
              </CardBody>
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

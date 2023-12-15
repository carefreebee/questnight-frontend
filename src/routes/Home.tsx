import { Button, Card, CardBody, Link, useDisclosure } from "@nextui-org/react";
import CreateEventModal from "~/components/createEventModal";

export default function Home() {
  const whatDisclosure = useDisclosure();

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <Card className="h-64 w-96 transform transition-transform hover:scale-110 hover:bg-gray-700">
        <Button className="h-64 w-96" onClick={whatDisclosure.onOpen}>
          <CardBody className="flex items-center justify-center font-bold">
            <p className="text-2xl">Create Event</p>
          </CardBody>
        </Button>
      </Card>
      <CreateEventModal disclosure={whatDisclosure} />
      <div className="flex items-center justify-around gap-10">
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Button className="h-32 w-64" as={Link} href="/games">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Game Library</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Button className="h-32 w-64" as={Link} href="/events">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">View Events</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 w-64 transform transition-transform hover:scale-110 hover:bg-gray-700">
          <Button className="h-32 w-64" as={Link} href="/players">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Players</p>
            </CardBody>
          </Button>
        </Card>
      </div>
    </div>
  );
}

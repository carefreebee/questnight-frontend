import { Button, Card, CardBody, Link, useDisclosure } from "@nextui-org/react";
import CreateEventModal from "~/components/createEventModal";

export default function Home() {
  const whatDisclosure = useDisclosure();

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-4">
      <h1 className="rounded-2xl bg-indigo-500 bg-opacity-70 p-6 px-8 text-4xl font-black drop-shadow-[0_0_16px_rgba(255,255,255,0.1)]">
        QuestNight
      </h1>
      <Card className="h-64 w-[800px] transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-[1.02]">
        <Button className="h-64 w-full bg-indigo-500" onClick={whatDisclosure.onOpen}>
          <CardBody className="flex items-center justify-center font-bold">
            <p className="text-2xl">Create Event</p>
          </CardBody>
        </Button>
      </Card>
      <CreateEventModal disclosure={whatDisclosure} />
      <div className="flex w-[800px] items-center gap-10">
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/games">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Game Library</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/events">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">View Events</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/players">
            <CardBody className="flex items-center justify-center font-bold">
              <p className="text-2xl">Players</p>
            </CardBody>
          </Button>
        </Card>
      </div>
    </div>
  );
}

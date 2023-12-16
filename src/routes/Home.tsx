import { Button, Card, CardBody, Link, useDisclosure } from "@nextui-org/react";
import { CalendarRange, GitBranchPlus, Library, Swords, UsersRound } from "lucide-react";
import CreateEventModal from "~/components/createEventModal";

export default function Home() {
  const whatDisclosure = useDisclosure();

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center gap-4">
      <h1 className="flex items-center gap-3 pb-2 text-4xl font-black text-indigo-50 drop-shadow-[4px_4px_0_rgba(99,102,241,1.0)]">
        <Swords size={42} />
        QuestNight
      </h1>
      <Card className="h-64 w-[800px] transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-[1.02]">
        <Button className="h-64 w-full bg-indigo-500" onClick={whatDisclosure.onOpen}>
          <CardBody className="flex flex-col items-center justify-center gap-8 font-bold">
            <GitBranchPlus size={92} />
            <p className="text-2xl">Create Event</p>
          </CardBody>
        </Button>
      </Card>
      <CreateEventModal disclosure={whatDisclosure} />
      <div className="flex w-[800px] items-center gap-10">
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/games">
            <CardBody className="flex flex-col items-center justify-center gap-1 font-bold">
              <Library size={42} />
              <p className="text-2xl">Game Library</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/events">
            <CardBody className="flex flex-col items-center justify-center gap-1 font-bold">
              <CalendarRange size={42} />
              <p className="text-2xl">View Events</p>
            </CardBody>
          </Button>
        </Card>
        <Card className="h-32 flex-1 transform shadow-[5px_5px_0px_0px_rgba(74,65,181)] transition-transform hover:scale-110">
          <Button className="h-32 w-full bg-indigo-500" as={Link} href="/players">
            <CardBody className="flex flex-col items-center justify-center gap-1 font-bold">
              <UsersRound size={42} />
              <p className="text-2xl">Players</p>
            </CardBody>
          </Button>
        </Card>
      </div>
    </div>
  );
}

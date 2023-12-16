import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
  type Selection,
} from "@nextui-org/react";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Events() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentEvents, setEvents] = useState([]);
  const [games, setGames] = useState([]);
  const [players, setPlayers] = useState([]);

  async function fetchEvents() {
    const response = await fetch("http://localhost:5000/events");
    const data = await response.json();
    setEvents(data);
  }
  async function fetchGames() {
    const response = await fetch("http://localhost:5000/games");
    const data = await response.json();
    setGames(data);
  }

  async function fetchPlayers() {
    const response = await fetch("http://localhost:5000/players");
    const data = await response.json();
    setPlayers(data);
  }

  useEffect(() => {
    fetchEvents();
    fetchGames();
    fetchPlayers();
  }, []);

  const [selectGame, setSelectGame] = useState<Selection>(new Set());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectPlayer, setSelectPlayer] = useState<Selection>(new Set());
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    if (!selectedEventId) return;
    const index = currentEvents.findIndex((event) => event.event_id === selectedEventId);

    setStartDate(format(new Date(currentEvents[index].start_date), "yyyy-MM-dd"));
    setEndDate(format(new Date(currentEvents[index].end_date), "yyyy-MM-dd"));
    setSelectGame(new Set([currentEvents[index].game_id?.toString()]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEventId]);

  async function updateEvent() {
    if (
      !startDate ||
      !endDate ||
      !Array.from(selectGame).length ||
      !Array.from(selectPlayer).length
    ) {
      alert("Please fill in all fields");
      return;
    }
    onOpenChange();

    console.log(selectedEventId);
    const reqBody = {
      start_date: startDate,
      end_date: endDate,
      game_id: Array.from(selectGame)[0],
      winner_id: Array.from(selectPlayer)[0],
    };
    console.log(reqBody);

    await fetch(`http://localhost:5000/events/${selectedEventId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(reqBody),
    });
    fetchEvents();

    setStartDate("");
    setEndDate("");
    setSelectGame(new Set());
  }

  async function deleteEvent(eventId) {
    await fetch(`http://localhost:5000/events/${eventId}`, {
      method: "DELETE",
    });
    fetchEvents();
  }

  function onDeleteEvent(eventId) {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      deleteEvent(eventId);
      console.log(`Event with id ${eventId} has been deleted.`);
    }
  }

  function EventDetails({ event }) {
    const startDate = new Date(event.start_date).toLocaleDateString();
    const endDate = new Date(event.end_date).toLocaleDateString();
    return (
      <Card className="w-[300px]">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">{event.game_title}</p>
          </div>
          <div>
            <Button
              color="danger"
              startContent={<Trash2 />}
              onPress={() => {
                onDeleteEvent(event.event_id);
              }}
            >
              Delete
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="flex gap-6">
              <p>Start date: {startDate}</p>
              <p>End date: {endDate}</p>
            </div>
            {event.winner_name && <p>Winner: {event.winner_name}</p>}
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-around">
          <Button color="primary" as={Link} href={`/events/${event.event_id}`}>
            View Participants
          </Button>
          <Button
            onClick={() => {
              setSelectedEventId(event.event_id);
              onOpen();
            }}
          >
            Update Event
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 p-8">
      {currentEvents.map((event, i) => (
        <EventDetails key={i} event={event} />
      ))}

      <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Event</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-8">
                  <div>
                    <Select
                      labelPlacement="outside"
                      label="Pick a Game"
                      placeholder="Select a game"
                      onSelectionChange={setSelectGame}
                      selectedKeys={selectGame}
                    >
                      {games.map((game) => (
                        <SelectItem key={game.game_id}>{game.title}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Input
                      autoFocus
                      label="Start Date"
                      placeholder="Enter Start Date"
                      type="date"
                      name="start_date"
                      variant="bordered"
                      value={startDate}
                      onValueChange={setStartDate}
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="End Date"
                      placeholder="Enter Start Date"
                      type="date"
                      name="end_date"
                      value={endDate}
                      onValueChange={setEndDate}
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Select
                      labelPlacement="outside"
                      label="Select a Winner"
                      placeholder="Select a winner"
                      onSelectionChange={setSelectPlayer}
                    >
                      {players.map((player) => (
                        <SelectItem key={player.player_id}>{player.name}</SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    setSelectedEventId(null);
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    updateEvent();
                  }}
                >
                  Update Event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

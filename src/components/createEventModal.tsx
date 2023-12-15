import {
  Button,
  Input,
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
import { useEffect, useState } from "react";

export default function CreateEventModal({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) {
  const [Events, setEvents] = useState([]);
  const [games, setGames] = useState([]);

  const [selectGame, setSelectGame] = useState<Selection>(new Set());
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
  useEffect(() => {
    fetchEvents();
    fetchGames();
    console.log(Events);
  }, []);

  async function createEvent() {
    if (!startDate || !endDate || !Array.from(selectGame).length) {
      alert("Please fill in all fields");
      return;
    }
    disclosure.onOpenChange();

    const reqBody = {
      start_date: startDate,
      end_date: endDate,
      game_id: Array.from(selectGame)[0],
    };
    console.log(reqBody);

    await fetch("http://localhost:5000/events/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    });
    fetchEvents();

    setStartDate("");
    setEndDate("");
    setSelectGame(new Set());
  }

  return (
    <>
      <Modal
        isOpen={disclosure.isOpen}
        onOpenChange={disclosure.onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Event</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col gap-8">
                  <div>
                    <Select
                      labelPlacement="outside"
                      label="Pick a Game"
                      placeholder="Select a game"
                      onSelectionChange={setSelectGame}
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
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    createEvent();
                  }}
                >
                  Create Event
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

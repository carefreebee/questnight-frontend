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
} from "@nextui-org/react";

export default function CreateEventModal({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) {
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
                    >
                      <SelectItem key="game 1">game 1</SelectItem>
                      <SelectItem key="game 2">game 2</SelectItem>
                      <SelectItem key="game 3">game 3</SelectItem>
                    </Select>
                  </div>
                  <div>
                    <Input
                      autoFocus
                      label="Start Date"
                      placeholder="Enter Start Date"
                      type="date"
                      name="name"
                      variant="bordered"
                      labelPlacement="outside"
                      size="lg"
                    />
                    <Input
                      autoFocus
                      label="End Date"
                      placeholder="Enter Start Date"
                      type="date"
                      name="name"
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
                <Button color="primary" onPress={onClose}>
                  GO!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

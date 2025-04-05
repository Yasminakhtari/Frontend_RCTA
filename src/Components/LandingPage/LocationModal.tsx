import { Modal, Image, Text, List, Badge, Group, Stack } from "@mantine/core";
const banner = "/Students/tennisTournament2.png";

interface LocationModalProps {
    opened: boolean;
    onClose: () => void;
    location: {
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        facilities: string[];
        imgUrl: string;
        phoneNumber: string;
    };
}

const LocationModal = ({ opened, onClose, location }: LocationModalProps) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            size="lg"
            title={<Text size="xl" fw={700}>📍 {location.name}</Text>}
        >
            <Stack gap="md">
                {/* Small Image */}
                <Image
                    // src={location.imgUrl || banner}
                    src={banner}
                    height={120}
                    width="100%"
                    alt="Location image"
                    className="rounded-lg"
                />

                {/* Address Section */}
                <Stack gap={4}>
                    <Text size="lg" fw={600}>Address</Text>
                    <Text>
                        {location.address}<br />
                        {location.city}, {location.state} {location.zipCode}
                    </Text>
                </Stack>

                {/* Contact Section */}
                <Stack gap={4}>
                    <Text size="lg" fw={600}>Contact Information</Text>
                    <Text>📞 {location.phoneNumber || '111-111-1111'}</Text>
                </Stack>

                {/* Facilities Section */}
                <Stack gap={4}>
                    <Text size="lg" fw={600}>Facilities</Text>
                    <Group gap="xs">
                        {location.facilities.map((facility, index) => (
                            <Badge key={index} color="blue" variant="filled">
                                {facility}
                            </Badge>
                        ))}
                    </Group>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default LocationModal;

import { Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next/types";
import { trpc } from "../utils/trpc";
import NextImage from "next/image";

const Home: NextPage = () => {
  const {
    data: pokemonPair,
    refetch,
    isLoading,
  } = trpc.useQuery(["get-pokemon-pair"], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const utils = trpc.useContext();

  function voteForPokemon() {
    utils.invalidateQueries("get-pokemon-pair");
  }

  return (
    <Flex
      w="100%"
      h="100vh"
      justify="center"
      align="center"
      flexDir="column"
      gap="20px"
    >
      <Text fontSize="6xl" fontWeight="bold">
        Who is Rounder?
      </Text>
      <Flex w="100%" justify="center" gap="50px">
        {pokemonPair && (
          <>
            <Flex>
              <Button
                width="200px"
                height="200px"
                p="0px"
                disabled={isLoading}
                onClick={voteForPokemon}
              >
                <NextImage
                  src={pokemonPair.firstPokemon.spriteURL as string}
                  alt={pokemonPair.firstPokemon.name}
                  width="200px"
                  height="200px"
                  layout="fixed"
                />
              </Button>
            </Flex>
            <Flex>
              <Button
                width="200px"
                height="200px"
                p="0px"
                onClick={voteForPokemon}
                disabled={isLoading}
              >
                <NextImage
                  src={pokemonPair.secondPokemon.spriteURL as string}
                  alt={pokemonPair.secondPokemon.name}
                  width="200px"
                  height="200px"
                  layout="fixed"
                />
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;

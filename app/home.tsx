import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { DetailButton } from '@/components/shared/detail-button/detail-button';
import { RecommendationList } from '@/components/views/home/recommendation-list';
import { useGetAnimeRecommendationsQuery, useGetRandomAnimeQuery } from '@/redux/api/anime-api';
import { useGetMangaRecommendationsQuery, useGetRandomMangaQuery } from '@/redux/api/manga-api';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  // Get anime recommendations
  const { data: animeRecommendations, error: animeError, isLoading: animeLoading, refetch: refetchAnime } = useGetAnimeRecommendationsQuery();

  // Get manga recommendations
  const { data: mangaRecommendations, error: mangaError, isLoading: mangaLoading, refetch: refetchManga } = useGetMangaRecommendationsQuery();

  // Random anime and manga APIs
  const { refetch: fetchRandomAnime } = useGetRandomAnimeQuery(undefined, {
    skip: true,
  });

  const { refetch: fetchRandomManga } = useGetRandomMangaQuery(undefined, {
    skip: true,
  });

  // Handle refresh
  const handleRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchAnime(), refetchManga()]);
    setRefreshing(false);
  }, [refetchAnime, refetchManga]);

  // Handle view all press
  const handleViewAllAnime = () => {
    router.push('/anime');
  };

  // Handle view all manga press
  const handleViewAllManga = () => {
    router.push('/manga');
  };

  // Handle random anime button press
  const handleRandomAnime = async () => {
    const { data } = await fetchRandomAnime();
    if (data?.mal_id) {
      router.push(`/anime-detail/${data.mal_id}`);
    }
  };

  // Handle random manga button press
  const handleRandomManga = async () => {
    const { data } = await fetchRandomManga();
    if (data?.mal_id) {
      router.push(`/manga-detail/${data.mal_id}`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#6200ee']} />}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to MyAnime!</Text>
          <Text style={styles.welcomeSubtitle}>Track your anime and manga journey</Text>

          <View style={styles.randomButtonsContainer}>
            {/* <Button label="Random Anime" onPress={handleRandomAnime} styleType="accent" className="flex-1 mr-2" />
            <Button label="Random Manga" onPress={handleRandomManga} styleType="primary" className="flex-1 ml-2" /> */}
            <DetailButton text="Random Anime" onPress={handleRandomAnime} style={{ flex: 1, marginRight: 8 }} />
            <DetailButton text="Random Manga" onPress={handleRandomManga} style={{ flex: 1, marginLeft: 8 }} />
          </View>
        </View>

        <RecommendationList
          title="Recommended Anime"
          data={animeRecommendations?.data}
          isLoading={animeLoading}
          error={animeError}
          type="anime"
          onViewAllPress={handleViewAllAnime}
        />

        <RecommendationList
          title="Recommended Manga"
          data={mangaRecommendations?.data}
          isLoading={mangaLoading}
          error={mangaError}
          type="manga"
          onViewAllPress={handleViewAllManga}
        />

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  randomButtonsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  spacer: {
    height: 40,
  },
});

export default HomeScreen;

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { skipToken } from '@reduxjs/toolkit/query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DetailButton } from '@/components/shared/detail-button/detail-button';
import { Header } from '@/components/shared/detail-header/detail-header';
import { EntityList } from '@/components/shared/entity-list/entity-list';
import { ErrorState } from '@/components/shared/error-state/error-state';
import { HeroSection } from '@/components/shared/hero-section/hero-section';
import { LoadingState } from '@/components/shared/loading-state/loading-state';
import { Synopsis } from '@/components/shared/synopsis/synopsis';
import { AnimeInformation } from '@/components/views/anime-detail/anime-information';
import { useSnackbar } from '@/providers/snackbar/snackbar-context';
import { useGetAnimeByIdQuery } from '@/redux/api/anime-api';
import { openExternalLink } from '@/utils/linking';

const AnimeDetailView = () => {
  const { showSnackbar } = useSnackbar();
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const animeId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const {
    data: animeDetailData,
    error: animeDetailError,
    isLoading: animeDetailLoading,
  } = useGetAnimeByIdQuery(animeId ? { id: animeId } : skipToken);

  const handleBack = () => {
    router.push('/anime');
  };

  if (animeDetailLoading) return <LoadingState />;
  if (animeDetailError) return <ErrorState message="Failed to load anime details" subtext="Please try again later" onBack={handleBack} />;
  if (!animeDetailData) return <ErrorState message="Anime not found" onBack={handleBack} />;

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} title={animeDetailData.title_english || animeDetailData.title} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <HeroSection media={animeDetailData} />

        <View style={styles.contentContainer}>
          {animeDetailData.synopsis && <Synopsis synopsis={animeDetailData.synopsis} />}

          <AnimeInformation animeDetail={animeDetailData} />

          <EntityList title="Studios" entities={animeDetailData.studios} />
          <EntityList title="Genres" entities={animeDetailData.genres} />
          {animeDetailData.themes.length > 0 && <EntityList title="Themes" entities={animeDetailData.themes} />}
          {animeDetailData.producers.length > 0 && <EntityList title="Producers" entities={animeDetailData.producers} />}

          <View style={styles.buttonContainer}>
            {animeDetailData.trailer.url && (
              <DetailButton
                icon="logo-youtube"
                text="Watch trailer"
                onPress={async () => await openExternalLink(animeDetailData.trailer.url, showSnackbar)}
              />
            )}
            {animeDetailData.url && (
              <DetailButton
                icon="open-outline"
                text="View on MyAnimeList"
                onPress={async () => await openExternalLink(animeDetailData.url, showSnackbar)}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    marginTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'space-around',
  },
  scrollView: {
    flex: 1,
  },
});

export default AnimeDetailView;

import React from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Provider } from 'react-redux';
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
import { useGetAnimeByIdQuery } from '@/redux/api/anime-api';
import { store } from '@/redux/config/store';

function AnimeDetailContent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const animeId = typeof id === 'string' ? parseInt(id, 10) : undefined;

  const {
    data: animeDetailData,
    error: animeDetailError,
    isLoading: animeDetailLoading,
  } = useGetAnimeByIdQuery(animeId ? { id: animeId } : skipToken);

  const handleBack = () => {
    router.back();
  };

  const handleOpenLink = () => {
    if (animeDetailData?.url) {
      Linking.openURL(animeDetailData.url);
    }
  };

  const handleOpenTrailer = () => {
    if (animeDetailData?.trailer.url) {
      Linking.openURL(animeDetailData.trailer.url);
    }
  };

  return (
    <View style={styles.container}>
      <Header onBack={handleBack} title={animeDetailData?.title_english || animeDetailData?.title} />

      {animeDetailLoading ? (
        <LoadingState />
      ) : animeDetailError ? (
        <ErrorState message="Failed to load anime details" subtext="Please try again later" onBack={handleBack} />
      ) : animeDetailData ? (
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
              {animeDetailData.trailer.url && <DetailButton icon="logo-youtube" text="Watch trailer" onPress={handleOpenTrailer} />}
              {animeDetailData.url && <DetailButton icon="open-outline" text="View on MyAnimeList" onPress={handleOpenLink} />}
            </View>
          </View>
        </ScrollView>
      ) : (
        <ErrorState message="Anime not found" onBack={handleBack} />
      )}
    </View>
  );
}

export default function AnimeDetailScreen() {
  return (
    <Provider store={store}>
      <AnimeDetailContent />
    </Provider>
  );
}

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

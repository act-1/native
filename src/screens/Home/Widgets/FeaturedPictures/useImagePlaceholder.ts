/**
 * Created by mrousavy
 * Changed to use Animated instead of Reanimated.
 * https://github.com/mrousavy/react-native-blurhash/issues/32#issuecomment-672774019
 */

import { useCallback, useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';

export interface ImagePlaceholderState {
  onImageLoadEnd: () => void;
  onImageLoadError: (e?: unknown) => void;
  placeholderOpacity: Animated.Value;
  renderPlaceholder: boolean;
}

/**
 * React hook for an animated image placeholder that automatically fades out and unmounts when the image has loaded.
 * @returns An instance of the `ImagePlaceholderState`. Use those values to configure the placeholder.
 */
export default function useImagePlaceholder(): ImagePlaceholderState {
  const placeholderOpacity = useRef(new Animated.Value(1)).current;
  const imageLoadError = useRef(false);
  const [renderPlaceholder, setRenderPlaceholder] = useState(true);
  const isMounted = useRef(true);

  const onImageLoadError = useCallback(() => {
    if (isMounted.current === false) return;
    imageLoadError.current = true;
  }, []);

  const onImageLoadEnd = useCallback(() => {
    if (isMounted.current === false) return;
    if (imageLoadError.current === true) return;
    Animated.timing(placeholderOpacity, {
      duration: 150,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      if (isMounted.current === false) return;
      setRenderPlaceholder(false);
    });
  }, [placeholderOpacity]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    onImageLoadEnd,
    onImageLoadError,
    placeholderOpacity,
    renderPlaceholder,
  };
}
